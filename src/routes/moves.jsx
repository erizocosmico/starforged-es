import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
    return (await import('../assets/data/moves.json')).default;
}

export default function Moves() {
    const moves = useLoaderData();
    moves.sort((a, b) => {
        const idxa = ORDER.indexOf(a.category);
        const idxb = ORDER.indexOf(b.category);

        if (idxa - idxb === 0) {
            return a.name.localeCompare(b.name);
        }

        return idxa - idxb;
    });
    return (
        <div className="my-5">
            <ul className="grid lg:grid-cols-2 gap-4">
                {moves.map(m => (
                    <Move key={m.id} {...m} />
                ))}
            </ul>
            <Outlet />
        </div>
    );
}

function Move({ id, name, trigger, category, color }) {
    return (
        <article className="last:border-b-0 border-b md:border md:last:border-b bg-white md:rounded-md px-2 md:px-4 py-3 md:hover:border-indigo-200 md:hover:shadow-md transition-all">
            <Link to={`/moves/${id}`}>
                <header className="flex items-center gap-2 mb-2">
                    <h2 className="font-bold flex-1 text-xl font-titles ">{name}</h2>
                    <span
                        style={{ backgroundColor: color }}
                        className="font-semibold text-xs text-white px-3 py-1 rounded-xl opacity-70 font-sans">
                        Movimiento de {CATEGORIES[category]}
                    </span>
                </header>
                <p className="text-slate-500 font-sans">{trigger}</p>
            </Link>
        </article>
    );
}

export const CATEGORIES = {
    session: 'sesión',
    connection: 'conexión',
    scene_challenge: 'reto de escena',
    quest: 'búsqueda',
    suffer: 'sufrimiento',
    adventure: 'aventura',
    fate: 'destino',
    combat: 'combate',
    threshold: 'límite',
    recover: 'recuperación',
    exploration: 'exploración',
    legacy: 'legado',
};

const ORDER = [
    'session',
    'adventure',
    'quest',
    'connection',
    'exploration',
    'combat',
    'suffer',
    'recover',
    'threshold',
    'legacy',
    'fate',
    'scene_challenge',
];
