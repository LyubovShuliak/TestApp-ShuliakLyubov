import React, { useEffect, useRef, useState } from 'react';

import { COLORS } from '../../resources/constants/color.constants';
import {
  TaskColumnName,
  TaskTileData,
} from '../../store/slices/tasks/tasks.types';

import { TaskCard } from './TaskCard';
import { TaskCreateForm } from './TaskCreateForm';

import { Droppable } from '@hello-pangea/dnd';
import { Button, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';

interface Props {
  title: TaskColumnName;
  data: TaskTileData[];
  index: number;
}

export const TaskColumn = ({ data, title, index }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const onClickAddNewTask = () => {
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
  };
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [showForm]);

  return (
    <Stack
      display="flex"
      margin={0}
      minWidth="300px"
      width="400px"
      bgcolor={COLORS.primary}
      borderRadius="8px"
      height="fit-content"
      maxHeight={'100%'}
      position="relative"
      direction="column"
      justifyContent="space-between"
      padding="0px 12px"
    >
      <Typography
        variant="h6"
        sx={{
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '1',
          padding: '10px',
        }}
        color="text.primary"
        textAlign="center"
      >
        {title}
      </Typography>

      <Droppable droppableId={title}>
        {(provided) => {
          return (
            <Stack
              {...provided.droppableProps}
              ref={provided.innerRef}
              overflow="scroll"
              height="100%"
              minHeight={'40px'}
              sx={{
                scrollbarColor:
                  'var(--ds-background-neutral-hovered, #091e4224) var(--ds-background-neutral, #091e420f)',
                scrollbarWidth: 'thin',
              }}
            >
              {data.map((item, i) => (
                <TaskCard
                  key={item.id}
                  title={item.title}
                  commentsCount={item.commentsCount}
                  id={item.id}
                  index={i}
                  description={item.description}
                  status={title}
                  history={item.history}
                  created={item.created}
                />
              ))}
              {provided.placeholder}
              <Box ref={ref} height={'fit-content'} minHeight={'2px'}>
                {showForm ? (
                  <TaskCreateForm
                    columnName={title}
                    columnId={index}
                    closeForm={closeForm}
                  />
                ) : null}
              </Box>
            </Stack>
          );
        }}
      </Droppable>

      <Button variant="text" sx={{ margin: '8px' }} onClick={onClickAddNewTask}>
        Add New Task +
      </Button>
    </Stack>
  );
};
