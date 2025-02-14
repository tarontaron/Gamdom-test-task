const calculateAmount = (amount: number, odds: string): number => {
  return parseFloat(Number(amount * +odds).toFixed(10));
};

export default calculateAmount;
