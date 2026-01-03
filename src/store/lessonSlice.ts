import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Lesson } from '../api/model';

type LessonMap = Record<string, Lesson[]>;

const initialState: LessonMap = {
    "today": [] as Lesson[],
    "historic": [] as Lesson[],
    "upcoming": [] as Lesson[],
    "available": [] as Lesson[],
};

const lessonSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {
        setLessons(
            state,
            action: PayloadAction<{ key: keyof LessonMap; lessons: Lesson[] }>
        ) {
            state[action.payload.key] = action.payload.lessons;
        },
    },
})

export const { setLessons } = lessonSlice.actions;
export default lessonSlice.reducer;