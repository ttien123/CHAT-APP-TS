import axios, { AxiosInstance } from 'axios';

export class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: '/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            proxy: {
                host: 'localhost',
                port: 5000,
            },
        });
    }
}

const http = new Http().instance;

export default http;
