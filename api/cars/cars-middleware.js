const carModel = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    let { id } = req.params;
    const car = await carModel.getById(id);
    if (car) {
      req.currentCar = car;
      next();
    } else {
      res
        .status(404)
        .json({ message: `${id} kimliğine sahip araba bulunamadı` });
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  try {
    let { vin, make, model, mileage } = req.body;
    if (vin === undefined) {
      res.status(400).json({ message: "vin eksik" });
    } else if (make === undefined) {
      res.status(400).json({ message: "make eksik" });
    } else if (model === undefined) {
      res.status(400).json({ message: "model eksik" });
    } else if (mileage === undefined) {
      res.status(400).json({ message: "mileage eksik" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberValid = (req, res, next) => {
  try {
    let { vin } = req.body;
    let isValidVin = vinValidator.validate(vin);
    if (isValidVin) {
      next();
    } else {
      res.status(400).json({ message: `vin ${vin} geçersizdir` });
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS
  try {
    let { vin } = req.body;
    const car = await carModel.getByVin(vin);
    if (car) {
      res.status(400).json({ message: `vin ${vin} zaten var` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
