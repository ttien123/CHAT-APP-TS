import { useQuery } from '@tanstack/react-query';
import Conversation from './Conversation';
import conversationApi from 'src/apis/conversation.api';
import { getRandomEmoji } from 'src/utils/emojis';
import { useEffect, useState } from 'react';
import useGetConversation from 'src/zustand/conversation.ztd';
import { ListUserCreate } from 'src/types/conversation.type';

const Conversations = () => {
    const { valueSearch } = useGetConversation();
    const [listConversationApi, setListConversationApi] = useState<ListUserCreate>([]);

    const ListConversation = listConversationApi.filter((e) =>
        e.fullName.toLocaleLowerCase().includes(valueSearch?.toLocaleLowerCase() || ''),
    );
    const { data, isLoading } = useQuery({
        queryKey: ['conversation'],
        queryFn: () => conversationApi.getUsers(),
    });

    useEffect(() => {
        data && setListConversationApi(data.data);
    }, [data]);
    return (
        <div className="py-2 flex flex-col overflow-auto">
            {ListConversation.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === ListConversation.length - 1}
                />
            ))}

            {isLoading ? <span className="loading loading-spinner mx-auto"></span> : null}
        </div>
    );
};
export default Conversations;
