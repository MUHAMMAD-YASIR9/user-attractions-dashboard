export enum UsersApiEnum {
  BASE = 'users',
  CREATE = 'users/create',
  UPDATE = 'users/update',
  DELETE = 'users/delete',
  BY_ID = 'users' // used like: `${UsersApiEnum.BY_ID}/${id}`
}