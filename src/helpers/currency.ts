export const formatCurrencyInCents = (amount: number) => {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100);
};
