const basicPluralise = (word, count) => {
  if (count === 1) return word;
  const endsWithY = word.substr(word.length - 1, 1) === 'y';

  return word
    .split('')
    .slice(0, endsWithY ? word.length - 1 : word.length)
    .reduce((prev, curr, index, array) => {
      const plural = index === array.length - 1
       ? (endsWithY ? 'ies' : 's')
       : '';
      return `${prev}${curr}${plural}`;
    });
};

export { basicPluralise };
