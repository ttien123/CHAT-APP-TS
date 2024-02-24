import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import path from './constants/path';

import useSetProfile from './zustand/auth.ztd';
// import Home from './pages/Home';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import NoChatSelected from './pages/Home/Components/NoChatSelected';
// import MessageId from './pages/Home/Components/MessageId';
// import NotFoundPage from './pages/NotFoundPage';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const NoChatSelected = lazy(() => import('./pages/Home/Components/NoChatSelected'));
const MessageId = lazy(() => import('./pages/Home/Components/MessageId'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function ProtectedRoute() {
    const profile = useSetProfile((state) => state.profile);
    return profile ? <Outlet /> : <Navigate to={'/login'} />;
}
function RejectedRoute() {
    const profile = useSetProfile((state) => state.profile);

    return !profile ? <Outlet /> : <Navigate to={'/'} />;
}

const useRouterElements = () => {
    const routeElements = useRoutes([
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: path.home,
                    element: (
                        <Suspense>
                            <Home />
                        </Suspense>
                    ),
                    children: [
                        {
                            path: path.home,
                            element: (
                                <Suspense>
                                    <NoChatSelected />
                                </Suspense>
                            ),
                        },
                        {
                            path: path.messageId,
                            element: (
                                <Suspense>
                                    <MessageId />
                                </Suspense>
                            ),
                        },
                    ],
                },
            ],
        },
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: path.signUp,
                    element: (
                        <Suspense>
                            <Signup />
                        </Suspense>
                    ),
                },
                {
                    path: path.login,
                    element: (
                        <Suspense>
                            <Login />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: '*',
            element: (
                <Suspense>
                    <NotFoundPage />
                </Suspense>
            ),
        },
    ]);

    return routeElements;
};

export default useRouterElements;
