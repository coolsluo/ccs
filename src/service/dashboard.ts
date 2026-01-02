import { getLessons } from '../api/api';
import type { Lesson } from '../api/model';


type LessonResult =
    { data: Lesson[]; error: string }

export const queryLessons = async (type: string, tutor: string): Promise<LessonResult> => {
    const lessons = await getLessons(type, tutor);
    if (!lessons) {
        return { data: [], error: '获取课程失败！' };
    }
    return { data: lessons, error: '' }
}
