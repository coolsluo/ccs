import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { User } from './model';

const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' },
});

export async function getUsers(): Promise<User[]> {
    const res: AxiosResponse<User[]> = await api.get(
        '/users'
    );
    return res.data;
}