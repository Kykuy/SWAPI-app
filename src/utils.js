function makeStringReadable(string) {
  let result = string;

  result = `${result[0].toUpperCase()}${result.slice(1)}`;
  result = result.replace(/_/g, ' ');
  return result;
}

export {makeStringReadable};

 