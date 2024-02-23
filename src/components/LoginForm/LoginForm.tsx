import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
} from '@mui/material';
import Input from '../Input';
import { CardContentStyled } from './LoginForm.style';
import { ICredentials } from '../../api/auth';

interface ILoginForm {
    isAdmin: boolean;
    onSubmit(credentials: ICredentials): void;
}
const LoginForm = ({ isAdmin, onSubmit }: ILoginForm) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        onSubmit({
            username,
            password
        });
    };


    return (
        <Container maxWidth="sm">
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                spacing={2}
            >
                <Grid item xs={12} md={8} >
                    <Card>
                        <CardContentStyled>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 2,
                                }}
                            >
                                <Typography variant="h4" component="h1">
                                    {isAdmin ? 'Admin Login' : 'User login'}
                                </Typography>
                            </Box>
                            <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button variant="contained" type="submit" onClick={handleSubmit} fullWidth>
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContentStyled>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default React.memo(LoginForm);