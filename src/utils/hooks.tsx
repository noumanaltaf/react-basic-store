import React from 'react';
import { ICredentials, callLogin } from '../api/auth';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActionsTypes } from '../reducers/auth';
import { AppState } from '../store';


export const useAuth = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppState>(state => state.auth.isLoggedIn) as boolean;
  const token = useSelector<AppState>(state => state.auth.token) as string;

  const login = async (credentials: ICredentials) => {
    try {
      const user = await callLogin(credentials);
      if (user.status) {
        dispatch({
          type: AuthActionsTypes.loginSuccess,
          payload: user.data.token
        });
        localStorage.setItem('isLoggedIn', true.toString());
        localStorage.setItem('token', JSON.stringify(user));
      } else {
        dispatch({
          type: AuthActionsTypes.loginError,
        })
      }

      return user;
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    dispatch({
      type: AuthActionsTypes.logout,
    });
  };

  const checkLogin = React.useCallback(
    () => {
      const isLoggedInLocal = localStorage.getItem('isLoggedIn') ?? null;
      const tokenLocal = localStorage.getItem('token') ?? null;
      if (isLoggedInLocal === 'true') {
        dispatch({
          type: AuthActionsTypes.loginSuccess,
          payload: tokenLocal
        });
      }
    },
    [dispatch]
  )

  React.useEffect(
    () => {
      checkLogin();
    },
    [checkLogin]
  );

  const hasLoginToken = () => localStorage.getItem('isLoggedIn') === 'true';

  return { hasLoginToken, isLoggedIn, token, login, logout };
};