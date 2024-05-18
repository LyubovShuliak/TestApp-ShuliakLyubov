export interface Board {
  name: string;
  hash: string;
  id: number;
}

export interface BoardsState {
  boards: Board[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface CreateBoardData {
  name: string;
  // Add other properties if necessary
}
