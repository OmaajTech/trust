const useConvertAmountToCoin = (amount, priceCoin) => {
  const coinAmount = Number(amount) / priceCoin;

  return { coinAmount };
};

export default useConvertAmountToCoin;
