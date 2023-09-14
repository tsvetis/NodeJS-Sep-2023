const fs = require("fs");

const text = "Mnogo obicham NODE JS, osobeno EXPRESS!";

fs.writeFile("./output.txt", text, "utf-8", (err) => {
  if (err) {
    console.log("Unsuccessful file saving!");
  }

  console.log("Successfully saved file!");
});
