import { useLoaderData } from 'react-router-dom';
import { CATEGORIES } from './moves';
import Modal from '../components/modal';

export async function loader({ params }) {
    return (await import('../assets/data/moves.json')).default.find(x => x.id === params.id);
}

export default function Move() {
    const move = useLoaderData();
    return (
        <Modal returnTo="/moves" title={move.name}>
            <div className="divide-y">
                <div
                    className="no-reset px-4 pb-6 pt-1"
                    dangerouslySetInnerHTML={{ __html: move.description }}></div>
                <footer className="px-4 py-2 items-center flex justify-between">
                    <span
                        style={{ backgroundColor: move.color }}
                        className="font-semibold text-xs text-white px-3 py-1 rounded-xl opacity-70">
                        Movimiento de {CATEGORIES[move.category]}
                    </span>
                    <span className="text-slate-500 text-xs font-mono">
                        {move.source.book} p.{move.source.page}
                    </span>
                </footer>
            </div>
        </Modal>
    );
}
