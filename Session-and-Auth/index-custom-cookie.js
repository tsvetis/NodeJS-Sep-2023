const express = require("express");
const { v4: uuid } = require("uuid");
const PORT = 5050;
const app = express();

app.get("/", (req, res) => {
  let id;
  const cookie = req.headers["cookie"];

  if (cookie) {
    // cookie first=asd;second=sad;third=asdsad;
    const [key, value] = cookie.split("=");
    id = value;
    console.log({ key });
    console.log({ value });
  } else {
    id = uuid();
    res.header("Set-Cookie", `userId=${id}`);
  }

  res.send("ok! ID: " + id);
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT} ...`));
