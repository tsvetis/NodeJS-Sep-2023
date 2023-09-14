const fs = require("fs");

// stream
const readStream = fs.createReadStream("./input.txt", {
  highWaterMark: 10000,
  encoding: "utf-8",
});

// on -> events
readStream.on("data", (chunk) => {
  console.log("Reading chunk....");
  console.log(chunk);
});

readStream.on("end", () => {
  console.log("Reading has finished!");
});
