export const outputFormats = ['basic', 'plain', 'json'];

export default (value) => (!(value instanceof Array) && (value instanceof Object));
