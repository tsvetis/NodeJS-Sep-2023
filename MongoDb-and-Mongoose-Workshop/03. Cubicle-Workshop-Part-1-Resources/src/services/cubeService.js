const Cube = require('./../models/Cube');
const cubes = [];

exports.create = async (cubeData) => {
  // const cube = new Cube(cubeData);
  // await cube.save();

  const cube = await Cube.create(cubeData);
  return cube;
};

exports.getAll = async (search, from, to) => {
  let filterCubes = await Cube.find().lean();

  const conditions = [];

  if (search) {
    conditions.push({
      name: {
        $regex: search,
        $options: 'i',
      },
    });
  }

  if (from) {
    conditions.push({ difficultyLevel: { $gte: Number(from) } });
  }

  if (to) {
    conditions.push({ difficultyLevel: { $lte: Number(to) } });
  }
  const finalSearch = conditions.length ? { $and: conditions } : {};

  filterCubes = await Cube.find(finalSearch).lean();

  return filterCubes;
};

exports.getSingleCube = (id) => Cube.findById(id).populate('accessories');

exports.attachAccessory = async (cubeId, accessoryId) => {
  // return Cube.findByIdAndUpdate(cubeId, {
  //   $push: { accessories: accessoryId },
  // });
  const cube = await this.getSingleCube(cubeId);
  cube.accessories.push(accessoryId);
  return cube.save();
};
