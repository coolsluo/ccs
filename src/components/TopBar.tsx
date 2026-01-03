import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { RootState } from '../store';
import { logout as logoutAction } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  dark: boolean;
  setDark: (v: boolean) => void;
}

export default function TopBar({ dark, setDark }: Props) {
  const nav = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
    nav('/login', { replace: true });
  };

  return (
    <Header>
      <Left>Test Example</Left>
      <Right>
        <span>user: {currentUser?.name}</span>
        <Toggle onClick={() => setDark(!dark)}>{dark ? 'Light' : 'Dark'}</Toggle>
        <Exit onClick={logout}>logout</Exit>
      </Right>
    </Header>
  );
}

/* ------ styled ------ */
const Header = styled.header`
  height: 64px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`;

const Left = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Toggle = styled.button`
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => (theme.mode === 'light' ? '#e5e7eb' : '#374151')};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Exit = styled.button`
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  background: #ef4444;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: #dc2626;
  }
`;