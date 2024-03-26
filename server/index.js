const express = require("express");
const compression = require("compression");
const { createHash } = require("crypto");
const { createReservation, getReservations } = require("./db");

const app = express();
const PORT = 3000;
const BASE_DIR = "../dist";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(BASE_DIR));

app.set("etag", (body) => {
  return createHash("sha1").update(body).digest("hex");
});

app.get("/", (_, res) => {
  res.sendFile("index.html", { root: BASE_DIR });
});

app.post("/reservations", async (req, res) => {
  const reservation = await createReservation(req.body);
  console.log("Reservation created!", reservation);
  res.redirect("/");
});

app.get("/reservations", async (_, res) => {
  const reservations = await getReservations();
  res.json(reservations);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
