import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
    return (await import('../assets/data/assets.json')).default;
}

export default function Assets() {
    const assets = useLoaderData();
    assets.sort((a, b) => a.name.localeCompare(b.name));
    return (
        <div className="my-5">
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                {assets.map(m => (
                    <Asset key={m.id} {...m} />
                ))}
            </ul>
            <Outlet />
        </div>
    );
}

function Asset({ id, name, category }) {
    return (
        <article className="border-b last:border-b-0 md:last:border-b md:border bg-white md:rounded-md px-4 py-3 md:hover:border-indigo-200 md:hover:shadow-md md:transition-all">
            <Link to={`/assets/${id}`}>
                <header className=" items-center gap-2 justify-between">
                    <h2 className="font-bold text-xl font-titles mb-1">{name}</h2>
                    <Category category={category} />
                </header>
            </Link>
        </article>
    );
}

export function Category({ category }) {
    return (
        <div className="flex gap-2 items-center">
            <span class={'material-symbols-outlined text-md ' + COLORS[category]}>
                {ICONS[category]}
            </span>
            <span className={'font-semibold uppercase text-xs tracking-wide ' + COLORS[category]}>
                {CATEGORIES[category]}
            </span>
        </div>
    );
}

export const CATEGORIES = {
    companion: 'Compañero',
    path: 'Senda',
    module: 'Módulo',
    deed: 'Hazaña',
    'support vehicle': 'Vehículo de soporte',
    'command vehicle': 'Vehículo de mando',
};

export const ICONS = {
    companion: 'smart_toy',
    path: 'signpost',
    module: 'extension',
    deed: 'social_leaderboard',
    'support vehicle': 'snowmobile',
    'command vehicle': 'rocket_launch',
};

export const COLORS = {
    companion: 'text-teal-600',
    path: 'text-cyan-600',
    module: 'text-violet-600',
    deed: 'text-lime-600',
    'support vehicle': 'text-blue-600',
    'command vehicle': 'text-yellow-700',
};
