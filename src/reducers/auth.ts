
export interface AuthState {
    isLoggedIn: boolean;
    token: string;
    error: string | null;
}
export const AuthActionsTypes = {
    loginSuccess: 'LOGIN_SUCCESS',
    loginError: 'LOGIN_ERROR',
    logout: 'LOGOUT'
}

export interface AuthAction {
    type: keyof typeof AuthActionsTypes;
    payload?: any;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: '',
    error: null,
};


export default function authReducer(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionsTypes.loginSuccess:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload as string,
                error: null,
            };
        case AuthActionsTypes.loginError:
            return {
                ...state,
                isLoggedIn: false,
                token: '',
                error: action.payload as string,
            };
        case AuthActionsTypes.logout:
            return {
                ...state,
                isLoggedIn: false,
                token: '',
                error: null,
            };
        default:
            return state;
    }
};