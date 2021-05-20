export interface UserCredentials {
    username: string;
    password: string;
}

export interface UserSession {
    user_key: string;
    profile_key: string;
}

export interface UserPassword {
    hashedPassword: string;
}

export interface AuthResponse {
    userSession?: UserSession;
    message: string;
}

declare module 'express-session' {
    export interface SessionData {
        user: UserSession;
        views: number;
    }
}
