import { IUser } from '../interfaces/IUser';

export async function getUserInfo(): Promise<IUser> {
  return {
    id: 1,
    name: 'John Doe',
  };
}
