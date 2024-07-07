const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const router = require("express").Router();

router.resource = function (path, obj) {
  const { index, show, store, update, destroy } = obj;
  if (index) this.get(path, asyncHandler(index));
  if (show) this.get(`${path}/:id`, asyncHandler(show));
  if (store) this.post(path, asyncHandler(store));
  if (update) this.put(`${path}/:id`, asyncHandler(update));
  if (destroy) this.delete(`${path}/:id`, asyncHandler(destroy));
};

fs.readdirSync(__dirname)
  .filter((file) => file.match(/controller.js$/))
  .forEach((file) => {
    const controller = require(path.join(__dirname, file));
    const [p] = file.split(".");
    router.resource(`/${p}`, controller);
  });

module.exports = router;
