import http from 'src/utils/http';

export const URL_GET_MESSAGE = '/api/messages/';
export const URL_SEND_MESSAGE = '/api/messages/send/';

const messageApi = {
    getMessages(id: string | undefined) {
        return http.get(`${URL_GET_MESSAGE}${id}`);
    },
    sendMessage({ id, message }: { id: string; message: string }) {
        return http.post(`${URL_SEND_MESSAGE}${id}`, { message });
    },
};

export default messageApi;
