const { User } = require("../models");

exports.index = async (req, res) => {
  const users = await User.findAll({ order: [["name", "asc"]] });
  res.json(users);
};

exports.show = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) throw new Error("Data not found");
  res.json(user);
};

exports.store = async (req, res) => {
  const user = await User.create(req.body);
  res.json({ message: "Data telah disimpan", data: user });
};

exports.update = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) throw new Error("Data not found");
  await user.update(req.body);
  user.reload();
  res.json({ message: "Data telah disimpan", data: user });
};

exports.destroy = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) throw new Error("Data not found");
  await user.destroy();
  res.json({ message: "Data telah dihapus", data: user });
};
