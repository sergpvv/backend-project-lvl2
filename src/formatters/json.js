import { get } from 'lodash';

export default (diff, before, after) => {
  const iter = (ast) => Object.entries(ast)
    .reduce((acc, [key, { type, path, children }]) => {
      const value1 = get(before, path);
      const value2 = get(after, path);
      const toValue = {
        unaltered: () => value1,
        removed: () => value1,
        added: () => value2,
        updated: () => [value1, value2],
        complex: () => iter(children),
      };
      const value = toValue[type]();
      return { ...acc, [key]: { type, value } };
    }, {});
  const result = JSON.stringify(iter(diff), null, '  ');
  return `${result}\n`;
};
