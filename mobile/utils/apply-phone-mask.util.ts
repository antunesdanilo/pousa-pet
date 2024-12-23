const applyPhoneMask = (value: string) => {
  const numericValue = value.replace(/\D/g, ''); // Remove tudo que não é número

  if (numericValue.length === 0) return '';
  if (numericValue.length === 1) return `(${numericValue}`;
  if (numericValue.length === 2) return `(${numericValue}`;
  if (numericValue.length === 3)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 3)}`;
  if (numericValue.length === 4)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 4)}`;
  if (numericValue.length === 5)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 5)}`;
  if (numericValue.length === 6)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}`;
  if (numericValue.length === 7)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6, 7)}`;
  if (numericValue.length === 8)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6, 8)}`;
  if (numericValue.length === 9)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6, 9)}`;
  if (numericValue.length === 10)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6, 10)}`;
  if (numericValue.length === 11)
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`;

  return value;
};

export { applyPhoneMask };
