// const is = require("is");
// console.log(is.even(3));

const querystring = require("querystring");

const myUrl = new URL("https://localhost:5000/somePath?query=year=20");
const qs = querystring.parse(myUrl.search);

console.log(qs);
