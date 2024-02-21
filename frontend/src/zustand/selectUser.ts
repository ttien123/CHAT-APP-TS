import { UserCreate } from 'src/types/conversation.type';
import { create } from 'zustand';

interface selectUserInterface {
    selectUser: Pick<UserCreate, '_id' | 'fullName' | 'profilePic'> | null;
    setSelectUser: (body: Pick<UserCreate, '_id' | 'fullName' | 'profilePic'>) => void;
}

const useSelectUser = create<selectUserInterface>()((set) => ({
    selectUser: null,
    setSelectUser: (body) => set((state) => ({ selectUser: (state.selectUser = body) })),
}));

export default useSelectUser;
