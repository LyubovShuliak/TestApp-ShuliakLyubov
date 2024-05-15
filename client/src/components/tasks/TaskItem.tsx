import React, { FC } from 'react';
type TaskProps = {
  taskId: string;
};
export const TaskItem: FC<TaskProps> = ({ taskId }) => {
  return (
    <div>
      <h1>{taskId}</h1>
    </div>
  );
};
