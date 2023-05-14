import https from 'https';
import fs from 'fs';

const SYSTEM_PACKS_URL =
    'https://raw.githubusercontent.com/ben/foundry-ironsworn/main/system/packs';
const SYSTEM_MOVES_URL = `${SYSTEM_PACKS_URL}/starforged-moves.db`;
const SYSTEM_ASSETS_URL = `${SYSTEM_PACKS_URL}/starforged-assets.db`;

const TRANSLATION_PACKS_URL =
    'https://raw.githubusercontent.com/erizocosmico/foundry-starforged-es/main/compendium';
const TRANSLATION_MOVES_URL = `${TRANSLATION_PACKS_URL}/foundry-ironsworn.starforgedmoves.json`;
const TRANSLATION_ASSETS_URL = `${TRANSLATION_PACKS_URL}/foundry-ironsworn.starforgedassets.json`;

const DEST_PATH = './src/assets/data/';

async function get(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, resp => {
                let data = '';
                resp.on('data', chunk => (data += chunk));
                resp.on('end', () => resolve(data));
            })
            .on('error', err => reject(err));
    });
}

async function mergeMoves() {
    const base = (await get(SYSTEM_MOVES_URL))
        .split('\n')
        .filter(x => x.trim())
        .map(x => JSON.parse(x));
    const translated = JSON.parse(await get(TRANSLATION_MOVES_URL));

    const entries = translated.entries;
    const moves = base.map(move => {
        const { name, description } = entries[move.name];
        const category = move.system.Category.split('/').pop().toLowerCase();
        return {
            name,
            id: `${category}-${move.name.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')}`,
            description,
            category,
            trigger: entries[move.name]['trigger text'],
            color: move.system.Display.Color,
            source: {
                book: move.system.Source.Title,
                page: move.system.Source.Page,
            },
        };
    });

    for (let i = 0; i < moves.length; i++) {
        moves[i].description = resolveReferences(moves[i].description, moves);
    }

    return moves;
}

async function mergeAssets(moves) {
    const base = (await get(SYSTEM_ASSETS_URL))
        .split('\n')
        .filter(x => x.trim())
        .map(x => JSON.parse(x));
    const translated = JSON.parse(await get(TRANSLATION_ASSETS_URL));

    const entries = translated.entries;
    return base
        .map(asset => {
            const entry = entries[asset.name];
            if (!entry) return undefined;
            const result = {
                name: entry.name,
                id: asset.name.toLowerCase().replace(/[^A-Za-z0-9]/g, '-'),
                category: asset.system.category.toLowerCase(),
                color: asset.system.Color,
                abilities: [
                    resolveReferences(entry['abilities description 1'], moves),
                    resolveReferences(entry['abilities description 2'], moves),
                    resolveReferences(entry['abilities description 3'], moves),
                ],
                preselected: asset.system.abilities[0].enabled,
            };

            if (entry.requirement) {
                result.requirement = resolveReferences(entry.requirement, moves);
            }

            if (entry['track name']) {
                result.track = {
                    ...asset.system.track,
                    name: entry['track name'],
                };
            }

            if (asset.system.exclusiveOptions?.length > 0) {
                result.options = asset.system.exclusiveOptions.map((o, i) => ({
                    ...o,
                    name: entry[`option ${i + 1} name`],
                }));
            }

            if (asset.system.fields?.length > 0) {
                result.fields = asset.system.fields.map((o, i) => ({
                    name: entry[`field ${i + 1} name`],
                }));
            }

            return result;
        })
        .filter(x => x);
}

function resolveReferences(text, moves) {
    return text.replace(/@Compendium\[[^\]]+\]\{([^\}]+)\}/g, (_, move) => {
        const m = moves.find(m => m.name.toLowerCase() === move.toLowerCase());
        if (!m) return move;
        return `<a href="/moves/${m.id}" title="Ver ${m.name}" class="move-reference">${m.name}</a>`;
    });
}

const moves = await mergeMoves();

fs.writeFileSync(DEST_PATH + 'moves.json', JSON.stringify(moves));
fs.writeFileSync(DEST_PATH + 'assets.json', JSON.stringify(await mergeAssets(moves)));
