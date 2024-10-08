const Customer = require("../../Modals/Customer");
const Order = require("../../Modals/Order");

const handleResponse = require("../services/handleResponse");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { userID, items, name, phone, email, isActive, message } = req.body;
      console.log(items);
      const customer = await Customer.create({
        userID,
        name,
        phone,
        email,
      });

      const order = await Order.create({
        userID,
        items,
        customerID: customer._id,
        isActive,
        message,
      });
      return handleResponse(
        res,
        200,
        "order created successfully",
        null,
        null,
        true
      );
    } catch (error) {
      return handleResponse(res, 500, "failed", error, null, false);
    }
  },
  //   getOrders: async (req, res) => {
  //     try {

  //       const { userID } = req.body;
  //       const customers = await Customer.find({ userID }).lean(); // Convert to plain JS objects

  //       const orders = await Order.find({ userID });

  //       const customersOrders = customers.map((customer) => {
  //         const customerOrders = orders.filter(
  //           (order) => order.customerID.toString() === customer._id.toString()
  //         );
  //         return { ...customer, orders: customerOrders };
  //       });

  //       return handleResponse(
  //         res,
  //         200,
  //         "orders fetched successfully",
  //         null,
  //         customersOrders,
  //         true
  //       );
  //     } catch (error) {
  //       return handleResponse(res, 500, "failed", error, null, false);
  //     }
  //   },
  getOrders: async (req, res) => {
    try {
      const { userID } = req.body;
      const customers = await Customer.find({ userID }).lean();
      const orders = await Order.find({ userID });
      //main loop
      const customerData = customers.map((items) => {
        //orders loop
        const orderdata = orders.filter(
          (data) => data.customerID.toString() === items._id.toString()
        );
        return { ...items, orders: orderdata };
      });

      handleResponse(
        res,
        200,
        "fetched successfully",
        null,
        customerData,
        true
      );
    } catch (error) {
      handleResponse(res, 500, null, "failed", error, false);
    }
  },
};
module.exports = orderController;
