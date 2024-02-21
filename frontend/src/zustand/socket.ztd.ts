import { Socket } from 'socket.io-client';
import { create } from 'zustand';
interface socketInterface {
    socket: Socket | null;
    onlineUsers: [] | string[];
    setSocket: (body: Socket | null) => void;
    setOnlineUsers: (body: [] | string[]) => void;
}

const useGetStateSocket = create<socketInterface>()((set) => ({
    socket: null,
    onlineUsers: [],
    setSocket: (body) => set((state) => ({ socket: (state.socket = body) })),
    setOnlineUsers: (body) => set((state) => ({ onlineUsers: (state.onlineUsers = body) })),
}));

export default useGetStateSocket;
