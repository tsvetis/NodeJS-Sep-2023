const mongoose = require("mongoose");

// Schema
const dogSchema = new mongoose.Schema({
  name: {
    required: [true, "Name is required!"],
    type: String,
    minLength: 3,
    maxLength: 30,
  },
  age: Number,
  color: String,
});

// Methods
dogSchema.methods.bark = function () {
  console.log(`Dog with name ${this.name} has barked!`);
};

// Virtual Properties (Calculated Properties)
dogSchema.virtual("description").get(function () {
  return `Dog name: ${this.name}, color: ${this.color}, age: ${this.age}.`;
});

// Static method
dogSchema.static("getDogsCollection", function (age) {
  return this.find();
});

// Model
const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;
