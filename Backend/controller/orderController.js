const Order = require('../model/Orders');
const sendEmail = require('../utils/sendEmail');

const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;
    if (items && items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    } else {
      const order = new Order({
        userId: req.user._id,
        items,
        totalAmount,
        address,
        paymentId
      });
      const createdOrder = await order.save();

      // Send Order Confirmation Email
      const message = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
    
    <h2 style="color: #2c3e50; text-align: center;">
      🎉 Order Confirmed!
    </h2>

    <p>Hi <strong>${req.user.name}</strong>,</p>

    <p>
      Thank you for shopping with <strong>FizCart</strong>. Your order has been placed successfully and is now being processed.
    </p>

    <div style="background: #ffffff; padding: 15px; border-radius: 8px; border-left: 5px solid #4CAF50; margin: 20px 0;">
      <p><strong>🆔 Order ID:</strong> ${createdOrder._id}</p>
      <p><strong>💳 Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
      <p><strong>📍 Shipping Address:</strong><br>
      ${address.street},<br>
      ${address.city}</p>
    </div>

    <p>
      We are preparing your order for shipment. You'll receive another email with tracking details as soon as your package is on its way.
    </p>

    <p style="margin-top: 30px;">
      Thanks for choosing <strong>FizCart</strong>! ❤️
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">

    <p style="font-size: 12px; color: #777; text-align: center;">
      If you have any questions, simply reply to this email or contact our support team.
    </p>

  </div>
`;

      await sendEmail({
        email: req.user.email,
        subject: 'FizCart - Order Confirmation',
        message
      });

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('userId', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems, getMyOrders, getOrders, updateOrderStatus };
