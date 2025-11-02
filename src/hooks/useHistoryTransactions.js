import { useMemo } from "react";

const useHistoryTransactions = (initialValue) => {
  const { gropedByDate, sorteByDate } = useMemo(() => {
    let groupTransanctionHistory = {};

    initialValue.forEach((coinTransac) => {
      const date = new Date(coinTransac.timeStamps).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );

      if (!groupTransanctionHistory[date]) {
        groupTransanctionHistory[date] = [];
      }

      groupTransanctionHistory[date].push(coinTransac);
    });

    const sortedGroupTransac = Object.keys(groupTransanctionHistory).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    return {
      gropedByDate: groupTransanctionHistory,
      sorteByDate: sortedGroupTransac,
    };
  }, [initialValue]);

  return { gropedByDate, sorteByDate };
};

export default useHistoryTransactions;
