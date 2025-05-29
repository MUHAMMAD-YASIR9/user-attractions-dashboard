import { User } from './user.model';

export interface GetUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface GetUserByIdResponse {
  status: string;
  user: User;
}

export interface GenericResponse {
  status: 'ok' | 'error';
  message: string;
}