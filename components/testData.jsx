// metadata: delete before deploying

const testDATA = [
  {
    id: 1,
    title: 'First Item',
    expense: 100,
    addDefault: 20,
    category: 'recurring',
  },
  {
    id: 2,
    title: 'Second Item',
    expense: 300,
    addDefault: 50,
    category: 'recurring',
  },
  {
    id: 3,
    title: 'Third Item',
    expense: 200,
    addDefault: null,
    category: 'recurring',
  },
  {
    id: 4,
    title: 'Fourth Item',
    expense: 300,
    addDefault: null,
    category: 'others',
  },
  {
    id: 5,
    title: 'Fifth Item',
    expense: 200,
    addDefault: null,
    category: 'others',
  },
];

const testAllowance = 3000;

const testHistory = [
  {
    id: 1,
    primaryID: 1,
    title: 'First Item',
    amount: 100,
  },
  {
    id: 2,
    primaryID: 2,
    title: 'Second Item',
    amount: 300,
  },
  {
    id: 3,
    primaryID: 3,
    title: 'Third Item',
    amount: 200,
  },
  {
    id: 4,
    primaryID: 4,
    title: 'Fourth Item',
    amount: 300,
  },
];

const primaryKey = 5;

const resetPeriodic = 'Never';

export { testDATA, testAllowance, testHistory, primaryKey, resetPeriodic, }