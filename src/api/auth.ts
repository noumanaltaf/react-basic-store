import { api } from "./util";

export interface ICredentials {
    username: string;
    password: string;
}


export const callLogin = (credentials: ICredentials) => api.post<ICredentials, any>('auth/login', credentials);
