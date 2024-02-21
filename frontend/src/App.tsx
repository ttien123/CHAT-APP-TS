import { useListenSocket } from './hooks/useListenSocket';
import useRouterElements from './useRouterElements';
import { Toaster } from 'react-hot-toast';

function App() {
    const routeElements = useRouterElements();
    useListenSocket();

    return (
        <div className="p-4 h-screen flex items-center justify-center">
            {routeElements}
            <Toaster />
        </div>
    );
}

export default App;
