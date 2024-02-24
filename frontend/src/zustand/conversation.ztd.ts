import { create } from 'zustand';

interface ValueSearchInterface {
    valueSearch: string;
    setValueSearch: (body: string) => void;
}

const useGetValueSearch = create<ValueSearchInterface>()((set) => ({
    valueSearch: '',
    setValueSearch: (body) => set((state) => ({ valueSearch: (state.valueSearch = body) })),
}));

export default useGetValueSearch;
