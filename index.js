const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

const replaceElements = require("./modules/replaceElements");

const overview = fs.readFileSync("./template/overview.html", "utf-8");
const card = fs.readFileSync("./template/cards.html", "utf-8");
const member = fs.readFileSync("./template/members.html", "utf-8");

const membersData = fs.readFileSync("./team-data/data.json", "utf-8");

const membersDataArray = JSON.parse(membersData);

//to set the slugs
const slugs = membersDataArray.map((element) =>
  slugify(element.teamMember, { lower: true })
);
console.log(slugs
            //havent been able to set slugs yet

const server = http.createServer((req, res) => {
  const siteURL = `http://${req.headers.host}`;
  const reqURL = new URL(req.url, siteURL);
  const pathName = reqURL.pathname;
  const query = reqURL.searchParams.get("id");

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardHtml = membersDataArray
      .map((elements) => replaceElements(card, elements))
      .join("");

    const output = overview.replace("{%CARDS%}", cardHtml);

    res.end(output);
  } else if (pathName === "/members") {
    res.writeHead(200, { "Content-type": "text/html" });
    const members =
      membersDataArray[query] || membersDataArray[slugs.indexOf(query)];
    console.log(query.indexOf(slugs));
    const output = replaceElements(member, members);
    res.end(output);
  }
});

//to create server
server.listen(8080, "127.0.0.1", () => {
  console.log("SERVER RUNNING @ PORT:8080");
});
