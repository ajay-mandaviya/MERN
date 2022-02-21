const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No model found in db",
        });
      }
      res.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save(() => {
    if (err) {
      return res.status(400).json({
        error: "failed to save your order",
      });
    }
    res.json(order);
  });
};
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "no order found in db",
        });
      }
      res.json(order);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.order },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return req.status(400).json({
          error: "Can not update order status",
        });
      }
      res.json(order)
    }
  );
};
