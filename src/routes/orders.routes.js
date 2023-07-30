const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");

const ordersRoutes = Router();

const ordersController = new OrdersController();


ordersRoutes.get("/", ordersController.index);
ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.delete("/:id", checkAdminPermission, ordersController.delete);
ordersRoutes.patch("/:id", checkAdminPermission, ordersController.update);

module.exports = ordersRoutes;