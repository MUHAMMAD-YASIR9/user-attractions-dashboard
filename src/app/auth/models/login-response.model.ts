import { LoginUser } from "./LoginUser.model";

export interface LoginResponse {
    status: string;
    message: string;
    accessToken: string;
    expiresIn?: number;
    user: LoginUser;
}