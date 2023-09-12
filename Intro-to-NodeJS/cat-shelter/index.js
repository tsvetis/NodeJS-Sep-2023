const http = require("http");
const homeHtml = require("./views/home/index.js");
const siteCss = require("./content/styles/site.js");
const addBreedHtml = require("./views/addBreed.js");
const catTempalte = require("./views/home/catTemplate.js");
const PORT = 5555;

const cats = [
  {
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*",
    name: "Tsunami",
    breed: "ulichna1",
    description: "Very cute cat1!",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    name: "Pesho",
    breed: "ulichna2",
    description: "Very cute cat2!",
  },
  {
    imageUrl:
      "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
    name: "Dancho",
    breed: "ulichna3",
    description: "Very cute cat3!",
  },
  {
    imageUrl:
      "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-superJumbo.jpg",
    name: "Mariika",
    breed: "ulichna4",
    description: "Very cute cat4!",
  },
];

const server = http.createServer((req, res) => {
  const { url } = req;

  if (url === "/") {
    const imageUrlPattern = /{{imageUrl}}/g;
    const namePattern = /{{name}}/g;
    const breedPattern = /{{breed}}/g;
    const descriptionPattern = /{{description}}/g;

    const catHtml = cats.map((cat) =>
      catTempalte
        .replace(imageUrlPattern, cat.imageUrl)
        .replace(namePattern, cat.name)
        .replace(breedPattern, cat.breed)
        .replace(descriptionPattern, cat.description)
    );

    const homeHtmlTemplate = homeHtml.replace("{{cats}}", catHtml);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(homeHtmlTemplate);
  } else if (url === "/content/styles/site.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(siteCss);
  } else if (url === "/cats/add-breed") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(addBreedHtml);
  }

  res.end();
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
