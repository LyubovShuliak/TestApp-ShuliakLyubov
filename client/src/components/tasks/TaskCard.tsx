import React, { useEffect, useState } from 'react';

import { COLORS } from '../../resources/constants/color.constants';
import { useAppDispatch } from '../../store/hooks';
import { deleteTask } from '../../store/slices/tasks/tasks.thunk';
import {
  TaskColumnName,
  TaskTileData,
} from '../../store/slices/tasks/tasks.types';
import { FullTask } from '../FullTask/FullTask';

import { TaskActions } from './TaskActions';

import { Draggable } from '@hello-pangea/dnd';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

interface Props extends TaskTileData {
  maxLines?: number;
  index: number;
  status: TaskColumnName;
}

export const TaskCard = ({
  title,
  commentsCount,
  maxLines = 3,
  id,
  index,
  description,
  status,
  history,
  created,
}: Props) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskDelete = () =>
    dispatch(deleteTask({ index, id, columnName: status }));
  useEffect(() => {
    console.log(commentsCount);
  }, [commentsCount]);
  return (
    <>
      <Draggable draggableId={id.toString()} index={index}>
        {(provided: any) => (
          <Card
            onClick={(event: any) => {
              if (created) handleOpen();
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            variant="outlined"
            sx={{
              flexDirection: 'column',
              marginBottom: '10px',
              padding: '10px',
              boxShadow: '1',
              position: 'relative',
              minHeight: '68px',
              display: 'flex',
              justifyContent: 'space-between',
              border: '2px solid transparent',
              '&:hover': {
                borderColor: COLORS.borderColor,
                cursor: 'pointer',
              },
            }}
          >
            <Typography
              variant="body2"
              color={'rgba(0, 0, 0, 0.6)'}
              margin={0}
              padding={0}
              fontSize={16}
            >
              {title}
            </Typography>

            <TaskActions
              handleTaskDelete={handleTaskDelete}
              commentsCount={commentsCount}
            />
            {!created ? (
              <Box
                position={'absolute'}
                top={0}
                left={0}
                bottom={0}
                right={0}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                sx={{ backgroundColor: COLORS.backdrop }}
                zIndex={100}
              >
                <CircularProgress />
              </Box>
            ) : null}
          </Card>
        )}
      </Draggable>

      <FullTask
        title={title}
        description={description}
        status={status}
        index={index}
        handleClose={handleClose}
        open={open}
        taskId={id}
        commentsCount={commentsCount}
        history={history}
      />
    </>
  );
};
