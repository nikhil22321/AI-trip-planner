const toCamel = str => str[0].toLowerCase() + str.slice(1);

function normalizeKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(normalizeKeys);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [toCamel(key), normalizeKeys(value)])
    );
  }
  return obj;
}

export default normalizeKeys;
