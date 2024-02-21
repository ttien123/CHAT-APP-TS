import { useQuery } from '@tanstack/react-query';
import Conversation from './Conversation';
import conversationApi from 'src/apis/conversation.api';
import { getRandomEmoji } from 'src/utils/emojis';
import { useEffect } from 'react';
import useGetConversation from 'src/zustand/conversation.ztd';

const Conversations = () => {
    const { listConversation, setListConversation } = useGetConversation();
    const { data, isLoading } = useQuery({
        queryKey: ['conversation'],
        queryFn: () => conversationApi.getUsers(),
    });

    useEffect(() => {
        if (listConversation.length === 0) {
            data && setListConversation(data.data);
        }
    }, [listConversation]);

    useEffect(() => {
        data && setListConversation(data.data);
    }, [data]);
    return (
        <div className="py-2 flex flex-col overflow-auto">
            {listConversation.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === listConversation.length - 1}
                />
            ))}

            {isLoading ? <span className="loading loading-spinner mx-auto"></span> : null}
        </div>
    );
};
export default Conversations;
