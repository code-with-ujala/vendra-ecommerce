const Order = require("../model/Order");
const sendEmail = require("../utils/sendEmail");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      address,
      paymentId,
    } = req.body;

    // Validate basic order data
    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      !totalAmount ||
      !address
    ) {
      return res.status(400).json({
        message: "Invalid order data",
      });
    }

    // Prepare order items according to Order schema
    const orderItems = items.map((item) => ({
      product: item.product,
      qty: Number(item.qty),
      price: Number(item.price),
    }));

    // Check product IDs
    const invalidItem = orderItems.find(
      (item) =>
        !item.product ||
        !item.qty ||
        item.qty < 1 ||
        !Number.isFinite(item.price)
    );

    if (invalidItem) {
      return res.status(400).json({
        message: "Invalid product information in order items",
      });
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount: Number(totalAmount),
      address: {
        fullName: address.fullName,
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
      },
      paymentId,
    });

    await order.save();

    // Send order confirmation email
    try {
      const message = `
Dear ${req.user.name || address.fullName},

Thank you for your order!

Order ID: ${order._id}

Total Amount: ₹${Number(totalAmount).toFixed(2)}

Shipping Address:
${address.fullName}
${address.street}
${address.city}
${address.postalCode}
${address.country}

We will notify you once your order is shipped.

Best Regards,
Vendra Team
`;

      await sendEmail(
        req.user.email,
        "Order Created Successfully",
        message
      );
    } catch (emailError) {
      console.error("Order email failed:", emailError);
      // Order is already saved, so don't fail the order because of email.
    }

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// Get logged-in user's orders
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product", "name price imageUrl")
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    console.error("My orders error:", error);

    return res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};


// Get all orders for admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "email name")
      .populate("items.product", "name price imageUrl")
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};


// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "shipped",
      "delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    return res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    return res.status(500).json({
      message: "Error updating order status",
      error: error.message,
    });
  }
};


module.exports = {
  createOrder,
  myOrders,
  getOrders,
  updateOrderStatus,
};