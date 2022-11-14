const Sequelize = require("sequelize");
const conn = new Sequelize("postgres://localhost/bookmarker");

const Bookmark = conn.define("bookmark", {
  name: { type: Sequelize.STRING, allowNull: false },
  url: { type: Sequelize.STRING, allowNull: false },
});

const Category = conn.define("category", {
  name: { type: Sequelize.STRING, allowNull: false },
});

Category.hasMany(Bookmark);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  await Promise.all(
    ["coding", "search", "jobs"].map((cat) => Category.create({ name: cat }))
  );
  await Promise.all([
    Bookmark.create({
      name: "Google",
      url: "https://www.google.com/",
      category: 2,
    }),
    Bookmark.create({
      name: "Stack Overflow",
      url: "https://stackoverflow.com/",
      category: 1,
    }),
    Bookmark.create({
      name: "Bing",
      url: "https://www.bing.com/",
      category: 2,
    }),
    Bookmark.create({
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
      category: 3,
    }),
    Bookmark.create({
      name: "Indeed",
      url: "https://www.indeed.com/",
      category: 3,
    }),
    Bookmark.create({
      name: "MDN",
      url: "https://developer.mozilla.org/en-US/",
      category: 1,
    }),
  ]);
};

module.exports = {
  conn,
  syncAndSeed,
  models: { Bookmark, Category },
};
