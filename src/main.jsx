import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';
import Root from './routes/root.jsx';
import ErrorPage from './routes/error.jsx';
import Moves, { loader as movesLoader } from './routes/moves';
import Assets, { loader as assetsLoader } from './routes/assets';
import Move, { loader as moveLoader } from './routes/move';
import Asset, { loader as assetLoader } from './routes/asset';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/moves',
                element: <Moves />,
                loader: movesLoader,
                children: [{ path: '/moves/:id', element: <Move />, loader: moveLoader }],
            },
            {
                path: '/assets',
                element: <Assets />,
                loader: assetsLoader,
                children: [{ path: '/assets/:id', element: <Asset />, loader: assetLoader }],
            },
            { index: true, element: <Moves />, loader: movesLoader },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
