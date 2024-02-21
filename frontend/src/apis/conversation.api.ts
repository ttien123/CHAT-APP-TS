import http from 'src/utils/http';

import { ListUserCreate, UserCreate } from 'src/types/conversation.type';

export const URL_GET_USERS = '/api/users';
export const URL_GET_USER = '/api/users/user';

const conversationApi = {
    getUsers() {
        return http.get<ListUserCreate>(URL_GET_USERS);
    },
    getUser(id: string | undefined) {
        return http.post<Pick<UserCreate, '_id' | 'fullName' | 'profilePic'>>(URL_GET_USER, { _id: id });
    },
};

export default conversationApi;
