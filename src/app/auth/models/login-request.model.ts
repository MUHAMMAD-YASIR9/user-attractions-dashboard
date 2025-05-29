export interface LoginRequest {
  username: string;
  password: string;
  expiresIn?: number;
}