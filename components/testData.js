// metadata: delete before deploying

const testDATA = [
  {
    id: 1,
    title: 'First Item',
    expense: 100,
    addDefault: 20,
    category: 'recurring',
    date: {
      date: 17,
      month: 6,
      year: 2021
    },
  },
  {
    id: 2,
    title: 'Second Item',
    expense: 300,
    addDefault: 50,
    category: 'recurring',
    date: {
      date: 22,
      month: 6,
      year: 2021
    },
  },
  {
    id: 3,
    title: 'Third Item',
    expense: 200,
    addDefault: null,
    category: 'recurring',
    date: {
      date: 24,
      month: 6,
      year: 2021
    },
  },
  {
    id: 4,
    title: 'Fourth Item',
    expense: 300,
    addDefault: null,
    category: 'others',
    date: {
      date: 7,
      month: 7,
      year: 2021
    },
  },
  {
    id: 5,
    title: 'Fifth Item',
    expense: 200,
    addDefault: null,
    category: 'others',
    date: {
      date: 11,
      month: 7,
      year: 2021
    },
  },
];

const testAllowance = 3000;

const testHistory = [
  {
    id: 1,
    primaryID: 1,
    title: 'First Item',
    amount: 100,
    date: {
      date: 17,
      month: 6,
      year: 2021
    },
  },
  {
    id: 2,
    primaryID: 2,
    title: 'Second Item',
    amount: 300,
    date: {
      date: 22,
      month: 6,
      year: 2021
    },
  },
  {
    id: 3,
    primaryID: 3,
    title: 'Third Item',
    amount: 200,
    date: {
      date: 24,
      month: 6,
      year: 2021
    },
  },
  {
    id: 4,
    primaryID: 4,
    title: 'Fourth Item',
    amount: 300,
    date: {
      date: 7,
      month: 7,
      year: 2021
    },
  },
  {
    id: 5,
    primaryID: 5,
    title: 'Fifth Item',
    amount: 200,
    date: {
      date: 11,
      month: 7,
      year: 2021
    },
  },
];

const primaryKey = 5;

const resetPeriodic = {
  expense: 'At start of every month',
  history: true,
};

const lastLogin = {
  date: 29,
  month: 6,
  year: 2021
}

export { testDATA, testAllowance, testHistory, primaryKey, resetPeriodic, lastLogin, }