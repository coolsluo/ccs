import React, { useState } from 'react';
import type { FormEvent } from 'react';
import styled from 'styled-components';
import { login } from '../service/login';
import { useNavigate } from 'react-router-dom';

const Page = styled.div`
  /* 始终占满视口并居中 */
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  padding: 1rem;
`;

const Card = styled.form`
  /* 手机端 90% 宽度，平板/电脑最大 400px */
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem; /* 手机端间距小，电脑端也够用 */
  padding: clamp(1.5rem, 5vw, 2.5rem); /* 自适应内边距 */
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  margin: 0 0 0.5rem;
  text-align: center;
  font-size: clamp(1.25rem, 4vw, 1.75rem); /* 手机小 电脑大 */
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  &:focus {
    border-color: #666;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: #1890ff;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #40a9ff;
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('登录', { username, password });
    const res = await login({ username, password });
    if (!res.ok) {
      console.log(res.error);
      return;
    }
    // TODO 在 REDUX中存储token
    navigate('/dashboard', { replace: true });
  };

  return (
    <Page>
      <Card onSubmit={handleSubmit}>
        <Title>ccs</Title>
        <Input
          placeholder="账号"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">登录</Button>
      </Card>
    </Page>
  );
};

export default Login;