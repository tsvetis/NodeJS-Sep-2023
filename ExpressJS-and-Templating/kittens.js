const kittens = [];

exports.addKitten = (name, age) => {
  kittens.push({ name, age });
};

exports.getKittens = () => kittens.slice();
