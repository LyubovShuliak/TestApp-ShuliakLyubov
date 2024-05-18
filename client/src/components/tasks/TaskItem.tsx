import React from 'react';

import { Draggable } from '@hello-pangea/dnd';
export interface Task {
  id: string;
  content: string;
}
interface TaskProps {
  task: Task;
  index: number;
}

export const TaskItem: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: any) => (
        <div
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};
