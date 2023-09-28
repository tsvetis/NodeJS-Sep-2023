const Accessory = require("./../models/Accessory");

exports.create = (accessoryData) => Accessory.create(accessoryData);

exports.getAll = () => Accessory.find();
