import React, { useEffect } from 'react';

import { PADDING } from '../../resources/constants/gutter.constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeTasks,
  setTasksAndColumnsFromCache,
} from '../../store/slices/tasks/tasks.slice';
import { reorderTask } from '../../store/slices/tasks/tasks.thunk';
import { TaskColumnName } from '../../store/slices/tasks/tasks.types';

import { TaskColumn } from './TaskColumn';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Stack } from '@mui/material';

export const Board: React.FC<{
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ containerRef }) => {
  const dispatch = useAppDispatch();

  const currentBoard = useAppSelector((state) => state.board.currentBoard);

  const { tasks, columns, status } = useAppSelector((state) => state.tasks);
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) ||
      !currentBoard?.id
    ) {
      return;
    }
    dispatch(
      reorderTask({
        apiRequestBody: {
          taskId: Number(draggableId),
          previousOrder: source.index + 1,
          previousColumnId:
            columns[source.droppableId as TaskColumnName].columnId,
          columnId: columns[destination.droppableId as TaskColumnName].columnId,
          order: destination.index + 1,
          boardId: currentBoard.id,
        },
        contextData: {
          destination: destination.droppableId as TaskColumnName,
          taskId: Number(draggableId),
          futureTaskIndex: destination.index,
          currentTaskIndex: source.index,
          source: source.droppableId as TaskColumnName,
        },
      }),
    );

    localStorage.setItem('cacheTasks', JSON.stringify({ tasks, columns }));

    dispatch(
      changeTasks({
        destination: destination.droppableId as TaskColumnName,
        taskId: Number(draggableId),
        futureTaskIndex: destination.index,
        currentTaskIndex: source.index,
        source: source.droppableId as TaskColumnName,
      }),
    );
  };
  const getTaskFromCache = () => {
    const cacheData = localStorage.getItem('cacheTasks');
    if (cacheData) {
      const parsedData = JSON.parse(cacheData);
      dispatch(setTasksAndColumnsFromCache(parsedData));
    }
  };
  useEffect(() => {
    switch (status) {
      case 'failed':
        getTaskFromCache();
        break;
      case 'loading':
        console.log('loading');
        break;
      case 'succeeded':
        console.log('succeeded');
    }
  }, [status]);
  const cols = Object.keys(tasks) as TaskColumnName[];

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      autoScrollerOptions={{ startFromPercentage: 0.4 }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%',
          maxHeight: '100%',

          padding: PADDING.medium,
          gap: PADDING.medium,
          boxSizing: 'border-box',
          minWidth: '1000px',
          position: 'relative',
        }}
      >
        {cols.map((el, index) => {
          return (
            <TaskColumn
              data={tasks[el]}
              title={el}
              index={columns[el].columnId}
              key={el}
            />
          );
        })}
      </Stack>
    </DragDropContext>
  );
};
