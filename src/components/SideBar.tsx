import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function SideBar() {
  return (
    <Aside>
      <Title>菜单</Title>
      <Nav>
        <StyledLink to="/dashboard" $activeStyle>
          Dashboard
        </StyledLink>
      </Nav>
    </Aside>
  );
}

/* ------ styled ------ */
const Aside = styled.aside`
  width: 208px;
  background: ${({ theme }) => theme.card};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding: 24px 16px;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const Nav = styled.nav`
  flex: 1;
  padding: 0 16px;
`;

const StyledLink = styled(NavLink)<{ $activeStyle?: boolean }>`
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  transition: background 0.2s;
  &.active {
    background: ${({ theme }) => theme.primary};
    color: #fff;
  }
  &:not(.active):hover {
    background: ${({ theme }) => theme.mode === 'light' ? '#e5e7eb' : '#374151'};
`;