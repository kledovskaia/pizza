export const debounce = function (ms, callback) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    return setTimeout(() => callback.apply(this, args), ms);
  };
};
