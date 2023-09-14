const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, text) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(text);
});

console.log("Async reading of file has ENDED!");
