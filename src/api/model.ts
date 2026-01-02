export interface User {
    id: string,
    name: string,
    password: string,
    role: string,
}

export const LessonStatus = {
    Completed: 'Completed',
    Confirmed: 'Confirmed',
    Available: 'Available',
} as const;
type LessonStatusConst = typeof LessonStatus[keyof typeof LessonStatus];

export const LessonType = {
    Historic: 'Historic',
    Upcoming: 'Upcoming',
    Available: 'Available',
} as const;
type LessonTypeConst = typeof LessonType[keyof typeof LessonType];


export interface Lesson {
    id: string,
    date: string,
    type: LessonTypeConst,
    subject: string,
    students: string[],
    tutor: string,
    status: LessonStatusConst,
}