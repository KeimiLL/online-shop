export interface UserBase {
    email: string;
    password: string;
}

export interface User extends UserBase {
    firstName: string;
    lastName: string;
}

export interface DBUser extends UserBase {
    first_name: string;
    last_name: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}
