const fetchWrapper = ({ url, request }) => {
  return fetch(url, request);
};

export { fetchWrapper };
