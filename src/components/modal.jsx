import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Modal({ title, returnTo, children }) {
    const navigate = useNavigate();
    return (
        <div
            className="fixed top-0 right-0 z-50 w-full md:p-10 overflow-x-hidden overflow-y-auto h-full bg-white md:bg-slate-800 md:bg-opacity-80 font-sans"
            onClick={() => navigate(returnTo)}>
            <div
                className="relative bg-white md:rounded-lg md:shadow-2xl md:max-w-xl md:mx-auto"
                onClick={e => e.stopPropagation()}>
                <header className="flex items-center px-4 py-3">
                    <h1 className="text-2xl font-bold flex-1 font-titles tracking-wide">{title}</h1>
                    <Link to={returnTo} title="Cerrar" className="text-4xl hover:text-indigo-600">
                        ×
                    </Link>
                </header>

                {children}
            </div>
        </div>
    );
}
