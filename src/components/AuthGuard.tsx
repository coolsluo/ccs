import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';

export const AuthGuard: React.FC<{ children: ReactElement }> = ({ children }) => {
  const nav = useNavigate();
  const user = store.getState().user.user;

  useEffect(() => {
    if (!user) nav('/login', { replace: true });
  }, [user, nav]);

  if (!user) return null;
  return children;
};