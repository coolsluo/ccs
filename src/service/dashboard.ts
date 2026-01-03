import { getLessons } from '../api/api';
import type { Lesson } from '../api/model';


type LessonResult =
    { data: Lesson[]; error: string }
type DateRange = [string, string];

export const queryLessons = async (type: string, tutor?: string, range?: DateRange): Promise<LessonResult> => {
    const lessons = await getLessons(type, tutor);
    if (!lessons) {
        return { data: [], error: 'get lessons failed！' };
    }
    if (!range || range[0] === '' || range[1] === '') {
        return { data: lessons, error: '' };
    }
    const [start, end] = range;
    const startDay = new Date(start).setHours(0, 0, 0, 0);
    const endDay = new Date(end).setHours(23, 59, 59, 999);

    const filtered = lessons.filter(l => {
        const lessonTime = new Date(l.date).getTime();
        return lessonTime >= startDay && lessonTime <= endDay;
    });

    return { data: filtered, error: '' }
}
