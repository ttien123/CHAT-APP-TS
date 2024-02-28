import { MessageType } from 'src/types/message.type';
import { getListMebNewMessToLS, setListMebNewMessToLS } from 'src/utils/messages';
import { create } from 'zustand';

interface messageInterface {
    messages: MessageType[] | [];
    isWriting: boolean;
    isCheckMessages: boolean;
    listMebNewMess: string[] | [];
    setIsWriting: (body: boolean) => void;
    setMessages: (body: MessageType[] | []) => void;
    setIsCheckMessages: (body: boolean) => void;
    setListMebNewMess: (body: { id: string; type: boolean }) => void;
}

const useGetMessage = create<messageInterface>()((set) => ({
    messages: [],
    isCheckMessages: true,
    isWriting: false,
    listMebNewMess: getListMebNewMessToLS(),
    setMessages: (body) => set((state) => ({ messages: (state.messages = body) })),
    setIsWriting: (body) => set((state) => ({ isWriting: (state.isWriting = body) })),
    setIsCheckMessages: (body) => set((state) => ({ isCheckMessages: (state.isCheckMessages = body) })),
    setListMebNewMess: (body) =>
        set((state) => {
            if (body.type === true) {
                const newList = state.listMebNewMess.filter((value) => value !== body.id);
                setListMebNewMessToLS(newList);
                return {
                    ...state,
                    listMebNewMess: newList,
                };
            } else {
                const index = state.listMebNewMess.findIndex((value) => value === body.id);
                if (index === -1) {
                    setListMebNewMessToLS([...state.listMebNewMess, body.id]);
                    return {
                        ...state,
                        listMebNewMess: [...state.listMebNewMess, body.id],
                    };
                } else return state;
            }
        }),
}));

export default useGetMessage;
