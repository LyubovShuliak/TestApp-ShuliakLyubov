import { CommentI } from '../../../components/FullTask/FullTask';

export type Comment = {
  text: string;
  taskId: number;
  userId: number;
  userName: string;
  dateCreated: string;
};

export interface CommentsState {
  comments: { [key: number]: CommentI[] };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
