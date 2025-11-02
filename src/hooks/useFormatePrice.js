const useFormatePrice = () => {
  const formatePrice = (initialValue) => {
    return initialValue?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formateFigures = (numbs) => {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(numbs);
  };

  return { formatePrice, formateFigures };
};

export default useFormatePrice;
