const db = require("../../data/db-config");

const getAll = () => {
  // HOKUS POKUS
  return db("Cars");
};

const getById = (id) => {
  // HOKUS POKUS
  return db("Cars").where("id", id).first();
};

const getByVin = (vin) => {
  return db("Cars").where("vin", vin).first();
};

const create = (car) => {
  // HOKUS POKUS
  return db("Cars").insert(car);
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
};
