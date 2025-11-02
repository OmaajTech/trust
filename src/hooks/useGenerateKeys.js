const useGenerateKeys = () => {
  const generateNewKeys = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let parts = [];

    for (let i = 0; i < 4; i++) {
      let part = "";

      for (let j = 0; j < 4; j++) {
        part += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      parts.push(part);
    }

    return parts.join("-");
  };

  return { generateNewKeys };
};

export default useGenerateKeys;
