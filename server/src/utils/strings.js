const getQuerystringFromObject = object => {
  return `${Object.keys(object)
    .map(objKey => `${objKey}=${object[objKey]}`)
    .join('&')}`;
};

export { getQuerystringFromObject };
