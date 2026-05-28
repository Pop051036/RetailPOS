export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (
dateString: string,
includeTime: boolean = true)
: string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(includeTime && { hour: '2-digit', minute: '2-digit' })
  };
  return new Intl.DateTimeFormat('th-TH', options).format(new Date(dateString));
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('th-TH').format(num);
};