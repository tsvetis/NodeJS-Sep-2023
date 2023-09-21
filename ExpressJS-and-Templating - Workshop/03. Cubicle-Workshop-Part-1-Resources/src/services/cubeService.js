const uniqid = require("uniqid");
const cubes = [
  {
    id: "un0jndnqlmtg3mgn",
    name: "Kotkata Pesho",
    description: "asd",
    imageUrl:
      "https://images.pexels.com/photos/1500610/pexels-photo-1500610.jpeg?cs=srgb&dl=pexels-jadson-thomas-1500610.jpg&fm=jpg",
    difficultyLevel: 1,
  },
  {
    id: "un0jndnqlmtg3rm3",
    name: "sad",
    description: "asd",
    imageUrl: "asd",
    difficultyLevel: 1,
  },
  {
    id: "un0jndnqlmtg4are",
    name: "cube3",
    description: "n/a",
    imageUrl:
      "https://images.pexels.com/photos/1500610/pexels-photo-1500610.jpeg?cs=srgb&dl=pexels-jadson-thomas-1500610.jpg&fm=jpg",
    difficultyLevel: 3,
  },
];

exports.create = (cubeData) => {
  const id = uniqid();
  console.log({ id });

  const newCube = {
    id,
    ...cubeData,
  };

  cubes.push(newCube);
  return newCube;
};

exports.getAll = () => {
  return [...cubes];
};
