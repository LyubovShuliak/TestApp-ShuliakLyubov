import moment from 'moment';

import { DATE_FORMAT } from '../constants/dateFromat.constants';

export const utcDateTimeToLocalDateTime = (date: string) => {
  return moment(date).format(DATE_FORMAT);
};
