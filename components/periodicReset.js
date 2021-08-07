import ls from 'local-storage';
import { lastLogin } from './testData';

const periodicResetOption = [
  'At start of every month',
  // 'Once every fixed number of days',
  'Never'
];

const checkPeriodicReset = (triggerRefreshHome) => {
  let data = ls.get('DATA');
  let history = ls.get('HISTORY');
  const resetPeriodic = ls.get('RESETPERIODIC');
  const date = new Date();

  // console.log([lastLogin, [date.getFullYear(), date.getMonth()+1]]);

  switch(resetPeriodic.expense) {
    case periodicResetOption[0]:
      if((lastLogin.year < date.getFullYear()) || (lastLogin.month < date.getMonth()+1)) {
        data = data.filter(item => {
          if(item.category == 'recurring') {
            item.expense = 0;
            return item;
          }
        });
        if(resetPeriodic.history) history = [];
      }
      break;
    // case periodicResetOption[1]:
    // default:
  }

  ls.set('DATA', data);
  if(history.length == 0) ls.set('HISTORY', history);
  triggerRefreshHome();
}

export { checkPeriodicReset, periodicResetOption }