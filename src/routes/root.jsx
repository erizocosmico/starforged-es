import { Outlet, Link, useLocation } from 'react-router-dom';
import { classes } from '../util/styles';

export default function Root() {
    return (
        <>
            <Header />
            <main className="container max-w-5xl mx-auto px-3">
                <Outlet />
            </main>
            <footer className="container max-w-5xl mx-auto px-3 py-3 text-sm text-slate-500">
                <span>
                    <strong>The content in this website is not an official translation</strong>.
                    This work is based on{' '}
                </span>
                <a
                    href="https://www.ironswornrpg.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-slate-600 hover:underline">
                    Ironsworn: Starforged
                </a>
                , created by Shawn Tomkin, and licensed for our use under the{' '}
                <a
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-slate-600 hover:underline">
                    Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license
                </a>
                .
            </footer>
        </>
    );
}

function Header() {
    const { pathname } = useLocation();
    const active = pathname === '/' || pathname.startsWith('/moves') ? 'moves' : 'assets';
    return (
        <header className="">
            <nav className="md:flex gap-8 container max-w-5xl mx-auto px-3">
                <h1 className="text-3xl font-extrabold font-titles py-2 uppercase tracking-wider text-center">
                    <div>Starforged</div>
                    <div className="font-sans text-xs text-slate-500">Companion (ES)</div>
                </h1>
                <ul className="flex gap-4 w-full mt-2">
                    <li className="flex-1 md:flex-none">
                        <NavLink to="/moves" active={active === 'moves'}>
                            Movimientos
                        </NavLink>
                    </li>
                    <li className="flex-1 md:flex-none">
                        <NavLink to="/assets" active={active === 'assets'}>
                            Recursos
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

function NavLink({ to, children, active }) {
    return (
        <Link
            to={to}
            className={classes({
                'font-sans': true,
                'w-full': true,
                block: true,
                'tracking-wide': true,
                'px-1': true,
                'py-2': true,
                'text-center': true,
                'font-semibold': true,
                'text-slate-600': !active,
                'text-indigo-600': active,
                'border-b-2': true,
                'border-indigo-600': active,
                'border-white': !active,
                'hover:text-indigo-600': !active,
            })}>
            {children}
        </Link>
    );
}
