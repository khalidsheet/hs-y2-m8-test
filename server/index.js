const express = require("express");
const compression = require("compression");
const { createHash } = require("crypto");

const app = express();
const PORT = 3000;
const BASE_DIR = "../dist";

app.use(compression());
app.use(express.static(BASE_DIR));

app.set("etag", (body) => {
  return createHash("sha1").update(body).digest("hex");
});

app.get("/", (_, res) => {
  res.sendFile("index.html", { root: BASE_DIR });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
