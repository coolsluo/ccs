import styled from 'styled-components';

const Dashboard: React.FC = () => {
    return (
        <div>
            <Title>Dashboard</Title>
            <p>欢迎回来，这里是主控制台。</p>
        </div>
    );
}

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text};
`;

export default Dashboard;
