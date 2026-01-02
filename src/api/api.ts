import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { User, Lesson } from './model';



const api = axios.create({
    baseURL: 'http://localhost:3001',
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

export const updateLesson = async (lesson: Lesson): Promise<Lesson> => {
    const res: AxiosResponse<Lesson> = await api.patch(
        `/lessons/${lesson.id}`,
        lesson
    );
    return res.data;
}