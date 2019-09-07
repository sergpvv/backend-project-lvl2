const isComplex = (str) => str === 'complex';

export default (diff) => {
  const iter = (node) => node
    .reduce((acc, { type, key, value }) => ({
      ...acc,
      [key]: {
        type,
        value: (isComplex(type) ? iter(value) : value),
      },
    }), {});
  const result = iter(diff);
  return `${JSON.stringify(result, null, '  ')}\n`;
};
