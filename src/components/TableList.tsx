// ListTable.tsx
import React from 'react';
import styled from 'styled-components';
import type { Lesson } from '../api/model';
import { Card } from './Card';

const ScrollBox = styled.div`
  max-height: 400px;   
  overflow-y: auto;    
  padding-right: 0.5rem; 
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface TableListProps {
    lessons: Lesson[];
    onTake?: (id: string) => void;
}

export const TableList: React.FC<TableListProps> = ({ lessons, onTake }) => {
    if (!lessons.length) return <div>No lessons found.</div>;

    return (
        <ScrollBox>
            <List>
                {lessons.map((l) => (
                    <Card key={l.id} lesson={l} onTake={onTake} />
                ))}
            </List>
        </ScrollBox>
    );
};