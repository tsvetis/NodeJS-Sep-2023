const Furniture = require("../models/Furniture");

exports.getAll = async (qs) => {
  let query = Furniture.find();

  if (qs.where) {
    let [_, ownerId] = qs.where.split("=");
    ownerId = ownerId.replaceAll('"', "");
    // query = query.find({ _ownerId: ownerId });
    query = query.where("_ownerId").eq(ownerId);
  }

  const result = await query;
  return result;
};

exports.create = (furnitureData) => Furniture.create(furnitureData);

exports.getOne = (furnitureId) => Furniture.findById(furnitureId);

exports.update = (furnitureId, furnitureData) =>
  Furniture.findByIdAndUpdate(furnitureId, furnitureData);

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId);
