const { Router } = require("express");

const CartsController = require("../controllers/CartsController");

const cartsRoutes = Router();

const cartsController = new CartsController();

cartsRoutes.get("/", cartsController.index);
cartsRoutes.post("/", cartsController.create);
cartsRoutes.get("/:id", cartsController.show);
cartsRoutes.delete("/:id", cartsController.delete);
/*cartsRoutes.patch("/:id", cartsController.update);*/

module.exports = cartsRoutes;