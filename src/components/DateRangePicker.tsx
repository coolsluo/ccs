import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export type DateRange = [string, string]; // YYYY-MM-DD

const Root = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

interface Props {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export const DateRangePicker: React.FC<Props> = ({ value, onChange }) => {
  const [start, end] = value;
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  // 当外部 value 变化时同步内部状态（受控）
  useEffect(() => {
    setStartDate(start);
    setEndDate(end);
  }, [start, end]);

  // 开始日期改变
  const handleStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    setStartDate(newStart);
    // 如果新开始 > 当前结束，则把结束自动调成开始（允许同日）
    const newEnd = newStart > endDate ? newStart : endDate;
    setEndDate(newEnd);
    onChange([newStart, newEnd]);
  };

  // 结束日期改变
  const handleEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value;
    setEndDate(newEnd);
    onChange([startDate, newEnd]);
  };

  return (
    <Root>
      <Input type="date" value={startDate} onChange={handleStart} />
      <span>-</span>
      <Input type="date" value={endDate} onChange={handleEnd} />
    </Root>
  );
};