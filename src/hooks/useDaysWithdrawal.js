const useDaysWithdrawal = (initialValue) => {
  let daysLocked = 0;

  if (initialValue >= 500 && initialValue <= 4000) daysLocked = 21;
  else if (initialValue >= 4000 && initialValue <= 10000) daysLocked = 14;
  else if (initialValue >= 10000 && initialValue <= 100000) daysLocked = 7;
  else if (initialValue >= 100000) daysLocked = 3;

  return { daysLocked };
};

export default useDaysWithdrawal;
