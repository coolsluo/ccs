import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { User, Lesson } from './model';



const api = axios.create({
    // baseURL: 'http://localhost:3001',
    // baseURL: 'https://47.108.50.241',
    baseURL: 'https://coolsluo.com',
    // baseURL: '/api', 
    headers: { 'Content-Type': 'application/json' },
});

export const getUsers = async (): Promise<User[]> => {
    const res: AxiosResponse<User[]> = await api.get(
        '/users'
    );
    return res.data;
}

export const getLessons = async (type?: string,
    tutor?: string): Promise<Lesson[]> => {
    const qs = new URLSearchParams();
    if (type) qs.append('type', type);
    if (tutor) qs.append('tutor', tutor);
    const res: AxiosResponse<Lesson[]> = await api.get(
        `/lessons?${qs.toString()}`
    );
    return res.data;
}

export const updateLesson = async (
    id: string,
    patch: Partial<Lesson>
): Promise<Lesson> => {
    const res = await api.patch<Lesson>(`/lessons/${id}`, patch);
    return res.data;
};