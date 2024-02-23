import React from 'react';
import LoginForm from '../components/LoginForm';
import { ICredentials } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks';

interface ILogin {
    isAdmin: boolean;
};

function Login({ isAdmin }: ILogin) {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleOnSubmit = async (credentials: ICredentials) => {
        const response = await login(credentials);
        if ((response as any)?.status) {
            navigate(isAdmin ? '/admin' : '/');
        }
    }

    return (
        <LoginForm isAdmin={isAdmin} onSubmit={handleOnSubmit} />
    );
}

export default Login;