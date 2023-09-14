const fs = require("fs");
const path = require("path");

// Copy ?
const readStream = fs.createReadStream(path.resolve(__dirname, "input.txt"));
const writeStream = fs.createWriteStream(path.resolve(__dirname, "output.txt"));

// react on ReadStreams's event
readStream.on("data", (chunk) => {
  // write in the stream
  writeStream.write(chunk);
});

readStream.on("end", () => {
  console.log("I have finished reading!");
  writeStream.end();
});
