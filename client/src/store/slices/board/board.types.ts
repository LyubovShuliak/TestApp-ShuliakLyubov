export interface Board {
  name: string;
  hash: string;
  id: number;
}
export interface Column {
  columnId: number;
  taskIds: number[];
}

export interface BoardsState {
  boards: Board[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentBoard?: Board;
}

export interface CreateBoardData {
  name: string;
  // Add other properties if necessary
}
