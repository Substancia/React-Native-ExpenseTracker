// Metadata: delete before deploying
import React from 'react';
import ls from 'local-storage';
import { testDATA, testHistory, testAllowance, primaryKey, resetPeriodic } from './testData';

const resetData = () => {
  ls.set('DATA', testDATA);
  ls.set('ALLOWANCE', testAllowance);
  ls.set('HISTORY', testHistory);
  ls.set('PRIMARYKEY', primaryKey);
  ls.set('RESETPERIODIC', resetPeriodic);
}

export default resetData;