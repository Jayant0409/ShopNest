const express = require("express");
const Order = require("../models/orderSchema.js");
const sendEmail = require("../utils/sendEmail");


const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No order items"
      });
    }

    const order = new Order({
      userId: req.user._id,
      items,
      totalAmount,
      address,
      paymentId
    });

    // Save order
    const createdOrder = await order.save();

    // Email text
    const text = `
Hello ${req.user.name},

Your order has been successfully placed!

Order ID: ${createdOrder._id}
Total Amount Paid: ₹${totalAmount.toFixed(2)}

Shipping Address:
${address.street}
${address.city}

Thank you for shopping with ShopNest!

Your order will be processed and shipped shortly.

Regards,
ShopNest Team
`;

    // Email failure should not cancel the order
    try {
      await sendEmail({
        email: req.user.email,
        subject: "Order Placed Successfully",
        text
      });

      console.log("Order confirmation email sent successfully");

    } catch (emailError) {
      console.error("EMAIL SENDING ERROR:", emailError);
    }

    // createdOrder is available here
    return res.status(201).json({
      message: "Order Placed Successfully",
      createdOrder
    });

  } catch (error) {
    console.error("ADD ORDER ERROR:", error);

    return res.status(500).json({
      message: error.message
    });
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


const getOrders = async (req, res)=> {
    try{
    const orders = await Order.find({}).populate('userId', 'id name')
    res.status(200).json(orders);
}catch(error){
    res.status(500).json({ messagge: error.message })
}
};


const updateOrderStatus = async (req, res) => {
  try{
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if(!order){
        res.status(404).json({
            message: "Order not found"
        })
    }
    order.status = status || order.status;
    const updatedStatus = await order.save();
    res.status(200).json(updatedStatus)
  }
  catch(error){
    res.status(500).json({message: error.message })
  }
}

module.exports = {
    addOrderItems,
    getOrders,
    getMyOrders,
    updateOrderStatus
}