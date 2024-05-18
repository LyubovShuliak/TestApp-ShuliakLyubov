import React from 'react';

import { Task, TaskItem } from './TaskItem';

import { Droppable } from '@hello-pangea/dnd';
export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}
export interface ColumnProps {
  column: Column;
  tasks: Task[];
}

export const TaskList: React.FC<ColumnProps> = ({ column, tasks }) => {
  return (
    <div className="column">
      <h3>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
