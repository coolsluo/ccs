import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { queryLessons } from '../service/dashboard';
// import type { Lesson } from '../api/model';
import { LessonType, LessonStatus } from '../api/model';
import { setLessons } from '../store/lessonSlice';
import { TableList } from '../components/TableList';
import { updateLesson } from '../api/api';
import { DateRangePicker } from '../components/DateRangePicker';
import type { DateRange } from '../components/DateRangePicker';



const today = new Date().toISOString().slice(0, 10);

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.user.user);
    const upcomingLessons = useSelector((state: RootState) => state.lessons.upcoming);

    const [historyRange, setHistoryRange] = useState<DateRange>([
        "", ""
    ]);

    const todayLessons = useSelector((state: RootState) => state.lessons.today);
    const historicLessons = useSelector((state: RootState) => state.lessons.historic);
    const availableLessons = useSelector((state: RootState) => state.lessons.available);


    const onTake = async (id: string) => {
        try {
            const res = await updateLesson(id, {
                tutor: currentUser?.name,
                type: LessonType.Upcoming,
                status: LessonStatus.Confirmed
            });

            const { data: availableLessons } = await queryLessons(LessonType.Available, currentUser?.name);
            const { data: upcomingLessons } = await queryLessons(LessonType.Upcoming, currentUser?.name);
            dispatch(setLessons({ key: "available", lessons: availableLessons }));
            dispatch(setLessons({ key: "upcoming", lessons: upcomingLessons }));

            console.log('take class success', res);
        } catch (e: any) {
            console.error('take class failed', e.message);
        }
    };

    const searchHistory = () => {
        queryLessons(LessonType.Historic, currentUser?.name, historyRange)
            .then(res => {
                dispatch(setLessons({ key: "historic", lessons: res.data }));
            })
    }

    useEffect(() => {
        queryLessons(LessonType.Upcoming, currentUser?.name, [today, today])
            .then(res => {
                dispatch(setLessons({ key: "today", lessons: res.data }));
            })
        queryLessons(LessonType.Historic, currentUser?.name)
            .then(res => {
                dispatch(setLessons({ key: "historic", lessons: res.data }));
            })
        queryLessons(LessonType.Available, currentUser?.name)
            .then(res => {
                dispatch(setLessons({ key: "available", lessons: res.data }));
            })
        queryLessons(LessonType.Upcoming, currentUser?.name)
            .then(res => {
                dispatch(setLessons({ key: "upcoming", lessons: res.data }));
            })
    }, []);
    return (
        <Wrapper>
            <Title>Dashboard</Title>
            <GridContainer>
                <LeftColumn>
                    <Panel>
                        <Label>upcoming</Label>
                        <TableList lessons={upcomingLessons} />
                    </Panel>
                    <Panel>
                        <HeaderRow>
                            <Label>historic</Label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <DateRangePicker value={historyRange} onChange={setHistoryRange} />
                                <SearchBtn onClick={searchHistory}>Search</SearchBtn>
                            </div>
                        </HeaderRow>
                        <TableList lessons={historicLessons} /></Panel>
                </LeftColumn>

                <RightColumn>
                    <Panel>
                        <Label>available</Label>
                        <TableList lessons={availableLessons} onTake={onTake} />
                    </Panel>
                    <Panel>
                        <Label>today</Label>
                        <TableList lessons={todayLessons} />
                    </Panel>
                </RightColumn>
            </GridContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  padding: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text};
`;

/* 外层栅格：左右两栏 */
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  height: 70vh;

  /* 小屏变一列 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* 左栏：上下两块 */
const LeftColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
`;

/* 右栏：上下两块 */
const RightColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
`;

/* 单个区域 */
const Panel = styled.div`
  border-radius: 8px;
  padding: 16px;
  min-height: 160px; /* 可视需要调整 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const Label = styled.div`
  align-self: flex-start;   /* 靠左 */
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 左右分离 */
  margin-bottom: 0.5rem;          /* 与下方表格间距 */
`;

const SearchBtn = styled.button`
  width: 4rem;               /* 控制宽度 */
  padding: 0.25rem 0;
  font-size: 0.8rem;
  border: 1px solid #1890ff;
  color: #1890ff;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #1890ff;
    color: #fff;
  }
`;

export default Dashboard;
