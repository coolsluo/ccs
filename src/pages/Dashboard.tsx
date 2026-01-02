import styled from 'styled-components';

const Dashboard: React.FC = () => {
    return (
        <Wrapper>
            <Title>Dashboard</Title>
            <GridContainer>
                <LeftColumn>
                    <Panel>左上</Panel>
                    <Panel>左下</Panel>
                </LeftColumn>

                <RightColumn>
                    <Panel>右上</Panel>
                    <Panel>右下</Panel>
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

export default Dashboard;
