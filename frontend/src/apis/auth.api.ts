import { AuthResponse, FormDataSignUp, FormDataLogin } from 'src/types/auth.type';
import http from 'src/utils/http';

export const URL_LOGIN = '/api/auth/login';
export const URL_SIGNUP = '/api/auth/signup';
export const URL_LOGOUT = '/api/auth/logout';

const authApi = {
    signup(body: FormDataSignUp) {
        return http.post<AuthResponse>(URL_SIGNUP, JSON.stringify(body));
    },
    login(body: FormDataLogin) {
        return http.post<AuthResponse>(URL_LOGIN, body);
    },
    logout() {
        return http.post(URL_LOGOUT);
    },
};

export default authApi;
