const mongoose = require("mongoose");
const Dog = require("./models/Dog");

const CONNECTION_STR = "mongodb://localhost:27017";
const DATABASE_NAME = "DogsDB";

async function connectDb() {
  await mongoose.connect(`${CONNECTION_STR}/${DATABASE_NAME}`);
  console.log(`Connected to database ${DATABASE_NAME} ...`);

  // Static, virtual, methods
  //   const dogs = await Dog.find();
  //   dogs.forEach((dog) => dog.bark());
  //   dogs.forEach((dog) => console.log(dog.description));
  //   const d = await Dog.getDogsCollection();

  // CREATE
  // Variant 1
  //   const newDog = new Dog({ name: "Lil", age: 4, color: "orange" });
  //   newDog.save();

  // Variant 2
  //   const newDog = await Dog.create({ name: "Sharo", age: 8, color: "sharen" });
  //   console.log(newDog);

  // READ
  const dogs = await Dog.find();
  //   const dogs = await Dog.find({ age: 1 });
  //   const dogs = await Dog.findOne();
  //   const dogs = await Dog.findOne({ age: 4 });
  //   const DOG_ID = "6513075c36a396eea6dde849";
  //   const dogs = await Dog.findById(DOG_ID);

  // UPDATE
  // Variant 1
  //   const updatedDog = await Dog.updateOne(
  //     { name: "Lisko" },
  //     { $set: { age: 199 } }
  //     // {  { age: 99 } } // mongoose way
  //   ); // dollar-sign syntax native mongodb
  //   console.log(updatedDog);

  // Variant 2
  //   const DOG_ID = "65131fc7a9d8dd55fa59856b";
  //   const dog = await Dog.findById(DOG_ID);
  //   dog.age = -3;
  //   dog.color = "transparent";
  //   dog.save();

  // Variant 3
  //    await Dog.findByIdAndUpdate(DOG_ID, { name: "Roshko" });

  // DELETE
  // Variant 1
  //   await Dog.deleteOne({ name: "Lisko" });

  // Variant 2
  //   const DOG_ID = "6513075c36a396eea6dde849";
  //   await Dog.findByIdAndDelete(DOG_ID);

  console.log(dogs);
}

connectDb();

// // FROM THE DB
// const DB_DOGS = [
//   {
//     _id: "6513077a36a392a6dde84a",
//     name: "Johny",
//     age: 12,
//     color: "white",
//   },
//   {
//     _id: "6513077a36a33eea6dde84a",
//     name: "Roshko",
//     age: 4,
//     color: "black",
//   },
//   {
//     _id: "65130136a396eea6dde84a",
//     name: "Pesho",
//     age: 1,
//     color: "brown",
//   },
// ];

// // THEN WHEN THEY ARE FETCHED, THEY ARE MAPPED WITH THE SCHEMA
// const transformedDbDogs = DB_DOGS.map((dog) => {
//   return {
//     ...dog,
//     getDescription: function () {
//       return `This dog is called ${this.name} !`;
//     },
//   };
// });

// // when all ready
// transformedDbDogs.forEach((dog) => console.log(dog.getDescription()));
