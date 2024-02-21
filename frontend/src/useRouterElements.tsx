import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import path from './constants/path';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import useSetProfile from './zustand/auth.ztd';
import NoChatSelected from './pages/Home/Components/NoChatSelected';
import MessageId from './pages/Home/Components/MessageId';

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
                    element: <Home />,
                    children: [
                        {
                            path: path.home,
                            element: <NoChatSelected />,
                        },
                        {
                            path: path.messageId,
                            element: <MessageId />,
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
                    element: <Signup />,
                },
                {
                    path: path.login,
                    element: <Login />,
                },
            ],
        },
    ]);

    return routeElements;
};

export default useRouterElements;
