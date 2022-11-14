//prettier-ignore
const {conn,syncAndSeed,models: { Bookmark, Category }} = require("./db");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

const init = async () => {
  try {
    await conn.authenticate();
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
