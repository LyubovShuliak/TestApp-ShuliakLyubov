import React, { useEffect } from 'react';

import { COLORS } from '../../resources/constants/color.constants';
import { PADDING, SPACE } from '../../resources/constants/gutter.constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getComments } from '../../store/slices/comments/comments.thunk';
import { changeCommentsCount } from '../../store/slices/tasks/tasks.slice';
import {
  HistoryItem,
  TaskColumnName,
} from '../../store/slices/tasks/tasks.types';

import { AddCommentForm } from './AddCommentForm';
import { DescriptionComponent } from './Description';
import { Header } from './Header';
import { HistoryItems } from './HistoryItems';
import { TaskComment } from './TaskComment';

import { Box, Modal, Typography, useTheme } from '@mui/material';

export interface CommentI {
  createdBy: string;
  comment: string;
  commentId: number;
  dateCreated: string;
}

interface Props {
  title: string;
  description: string;
  status: TaskColumnName;

  index: number;
  handleClose: () => void;
  open: boolean;
  taskId: number;
  commentsCount: number;
  history: HistoryItem[];
}

export const FullTask = ({
  title,
  description,
  status,
  index,
  handleClose,
  open,
  taskId,
  commentsCount,
}: Props) => {
  const {
    breakpoints: { down, up, between },
  } = useTheme();
  const style = {
    margin: SPACE.large,
    backgroundColor: COLORS.primaryLight,
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    minWidth: '250px',
    maxWidth: '100vw',
    alignItems: 'center',
    borderRadius: SPACE.small,
    [up('md')]: {
      padding: '30px',
    },
    [between('sm', 'md')]: {
      padding: '20px',
    },
    [down('sm')]: {
      padding: '15px',
    },
  };

  const dispatch = useAppDispatch();

  const comments = useAppSelector((state) => state.comments.comments[taskId]);
  const history = useAppSelector((state) => state.tasks.history[taskId]);

  useEffect(() => {
    if (comments && comments.length) {
      dispatch(changeCommentsCount({ taskId, status, count: comments.length }));
    }
  }, [comments]);

  useEffect(() => {
    if ((!comments || !comments.length) && commentsCount) {
      dispatch(getComments(taskId));
    }
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      sx={{
        overflow: 'auto',
        padding: SPACE.large,
        boxSizing: 'border-box',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/*<Fade in={open}>*/}
      <Box
        sx={{
          height: 'fit-content',
          ...style,
          position: 'relative',
        }}
      >
        <Header
          title={title}
          index={index}
          column={status}
          handleClose={handleClose}
        />
        <Box display="flex" marginLeft={PADDING.extraSmall}>
          <Typography variant="body2" fontWeight="bold">
            In list:
          </Typography>
          <Typography variant="body2">&nbsp;{status}</Typography>
        </Box>

        <DescriptionComponent
          description={description}
          column={status}
          index={index}
        />

        <Typography variant={'body2'} fontWeight={'bold'} pb={SPACE.medium}>
          Activity
        </Typography>
        <AddCommentForm index={index} status={status} />
        <Box height={SPACE.large} position={'relative'} />
        <HistoryItems history={history} />
        {comments?.map(({ createdBy, comment, commentId, dateCreated }) => {
          return (
            <TaskComment
              key={commentId}
              commentId={commentId}
              comment={comment}
              createdBy={createdBy}
              taskId={taskId}
              dateCreated={dateCreated}
              status={status}
            />
          );
        })}
      </Box>
      {/*</Fade>*/}
    </Modal>
  );
};
