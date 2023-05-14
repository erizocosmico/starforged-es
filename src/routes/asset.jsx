import { useLoaderData } from 'react-router-dom';
import Modal from '../components/modal';
import { Category } from './assets';

export async function loader({ params }) {
    return (await import('../assets/data/assets.json')).default.find(x => x.id === params.id);
}

export default function Asset() {
    const asset = useLoaderData();
    return (
        <Modal returnTo="/assets" title={asset.name}>
            <div className="grid gap-3 px-4 pb-4">
                <Category category={asset.category} />
                {asset.requirement && (
                    <div
                        className="text-slate-600 no-reset"
                        dangerouslySetInnerHTML={{ __html: asset.requirement }}></div>
                )}
                {asset.fields && (
                    <div className="grid gap-3 grid-cols-2">
                        {asset.fields.map(f => (
                            <div className="flex gap-3">
                                <span className="uppercase font-semibold tracking-wider text-sm">
                                    {f.name}
                                </span>
                                <span className="flex-1 border-b border-b-slate-300"></span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="divide-y pb-3">
                {asset.abilities.map((a, i) => (
                    <div className="flex py-3 px-4 gap-4">
                        <div className="text-3xl text-slate-900">
                            {i === 0 && asset.preselected ? '⬢' : '⬡'}
                        </div>
                        <div
                            className="no-reset"
                            key={i}
                            dangerouslySetInnerHTML={{ __html: a }}></div>
                    </div>
                ))}
            </div>
            {asset.track && (
                <div className="px-4 pb-4 pt-1 flex items-center gap-3">
                    <div className="uppercase font-semibold tracking-wider text-sm">
                        {asset.track.name}
                    </div>
                    <div className="flex items-center rounded-3xl border divide-x">
                        {Array.from(Array(asset.track.max), (_, i) => (
                            <div className="px-4 py-1">{i + 1}</div>
                        ))}
                    </div>
                </div>
            )}
        </Modal>
    );
}
