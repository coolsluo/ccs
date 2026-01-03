// Card.tsx
import React from 'react';
import styled from 'styled-components';
import type { Lesson } from '../api/model';

const Root = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;   /* 内容靠右 */
  align-items: center;
  height: 2rem;                /* 与按钮同高 */
  margin-top: 0.5rem;
`;

const TakeBtn = styled.button`
  width: 5.5rem;               /* 控制宽度 */
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #555;
`;

const Label = styled.span`
  font-weight: 600;
  color: #333;
`;

interface CardProps {
    lesson: Lesson;
    onTake?: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ lesson, onTake }) => (
    <Root>
        <Row>
            <Label>Date</Label>
            <span>{new Date(lesson.date).toLocaleString().split(' ')[0]}</span>
        </Row>

        <Row>
            <Label>Time</Label>
            <span>{new Date(lesson.date).toLocaleString().split(' ')[1]}</span>
        </Row>

        <Row>
            <Label>Student</Label>
            <span>{lesson.students.join(', ')}</span>
        </Row>

        <Row>
            <Label>Subject</Label>
            <span>{lesson.subject}</span>
        </Row>

        <Row>
            <Label>Type</Label>
            <span>{lesson.type}</span>
        </Row>

        <ActionRow>
            {lesson.type === 'Available' && (
                <TakeBtn onClick={() => onTake?.(lesson.id)}>Take Class</TakeBtn>
            )}
        </ActionRow>
    </Root>
);