export type User = {
  name: string;
  id: number;
};
export type CreateUserData = {
  name: string;
};

export interface UserState {
  user?: User;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
