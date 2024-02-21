import { ListUserCreate } from 'src/types/conversation.type';
import { create } from 'zustand';

interface listConversationInterface {
    listConversation: ListUserCreate | [];
    setListConversation: (body: ListUserCreate | []) => void;
}

const useGetConversation = create<listConversationInterface>()((set) => ({
    listConversation: [],
    setListConversation: (body) => set((state) => ({ listConversation: (state.listConversation = body) })),
}));

export default useGetConversation;
