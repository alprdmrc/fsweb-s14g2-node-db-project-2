// HOKUS POKUS
const router = require("express").Router();
const carModel = require("./cars-model");
const mw = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const cars = await carModel.getAll();
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkCarId, (req, res, next) => {
  try {
    res.json(req.currentCar);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkCarPayload,
  mw.checkVinNumberValid,
  mw.checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const { vin, make, model, mileage, title, transmission } = req.body;
      const insertedId = await carModel.create({
        vin: vin,
        make: make,
        model: model,
        mileage: mileage,
        title: title,
        transmission: transmission,
      });
      const insertedCar = await carModel.getById(insertedId);
      res.status(201).json(insertedCar);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
