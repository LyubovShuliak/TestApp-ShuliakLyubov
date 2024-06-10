import moment from 'moment/moment';
import React, { FC, useState } from 'react';

import { COLORS } from '../../resources/constants/color.constants';
import { SPACE } from '../../resources/constants/gutter.constants';
import { EventName, HistoryItem } from '../../store/slices/tasks/tasks.types';

import { AccountCircle } from '@mui/icons-material';
import { Box, Collapse, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Props = {
  history: HistoryItem[];
};
export const HistoryItems: FC<Props> = ({ history }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Stack height={'fit-content'}>
      <Button size={'medium'} onClick={() => setExpanded(!expanded)}>
        {!expanded ? 'Show history' : 'Hide history'}
      </Button>
      <Collapse in={expanded}>
        <Box>
          {history.map(
            ({ dateCreated, userName, id, eventName, column }, index) => {
              return (
                <Box
                  key={id}
                  display="flex"
                  marginTop={SPACE.normal}
                  flexDirection={'row'}
                >
                  <AccountCircle sx={{ color: 'action.active', mr: 1 }} />

                  <Box display="flex" flexDirection={'column'} flexGrow={'1'}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      flexGrow="1"
                      gap={SPACE.small}
                    >
                      <Box
                        display="flex"
                        flexDirection={'column'}
                        gap={SPACE.small}
                      >
                        <Typography variant={'body1'}>
                          <Typography variant="body2" fontWeight={'bold'}>
                            {userName}{' '}
                          </Typography>
                          {eventName === EventName.TaskCreated
                            ? `added task to ${column}`
                            : `transferred task  from ${history[index + 1].column} to ${column}`}
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight={'normal'}
                          sx={{ color: COLORS.textDark }}
                        >
                          {moment().diff(dateCreated, 'day') === 0
                            ? moment(dateCreated).format('H:mm')
                            : moment(dateCreated).format('D MMM YYYY H:mm')}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            },
          )}
        </Box>
      </Collapse>
    </Stack>
  );
};
