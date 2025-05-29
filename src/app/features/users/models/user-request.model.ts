export interface CreateUserRequest {
  fname: string;
  lname: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
}

export interface UpdateUserRequest {
  id: number;
  fname?: string;
  lname?: string;
  username?: string;
  email?: string;
  avatar?: string;
  password?: string; // optional for updates
}

export interface DeleteUserRequest {
  id: number;
}