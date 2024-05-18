export class CreateTaskDto {
  boardId: number;
  userId: number;
  title: string;
  description: string;
  status: number;
  order: number;
}
