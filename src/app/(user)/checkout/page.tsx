"use client";
import Header from '@/components/header'
import React from 'react';
import { useCart } from "@/context/cart-context";
import { Button, Card, Form, Input, Radio, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ICreateInvoice, ICreateOrder, IOrderItem } from '@/utils/types';
import { InvoiceStatusEnum, OrderStatusEnum, PaymentMethodEnum } from '@/utils/const';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import Link from 'next/link';
import { IInvoiceItem } from '@/models/invoice';

const CheckoutPage = () => {
  const { cartItems, clearCart, restauratnInCart } = useCart();
  const { register, handleSubmit } = useForm();
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethodEnum.COD);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const userItem = localStorage.getItem('user');
  const user = userItem ? JSON.parse(userItem) : null;

  // Calculate Total Price
  const subtotal = cartItems.reduce((sum, item: any) => sum + item.foodItem.discountedPrice * item.quantity, 0);
  const tax = subtotal * 0.125; // 12.5% tax
  const deliveryFee = subtotal > 500 ? 0 : 40; // Free delivery above ₹500
  const total = subtotal + tax + deliveryFee;


  const createInvoice = async (invoicePayload: ICreateInvoice) => {
    try {
      const res = await fetch(`${API_ENDPOINTS.invoices}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoicePayload),
      });
      const jsonResposne = await res.json();
      if (jsonResposne.success) {
        messageApi.success("Order and Invoice created successfully!");
        clearCart();
        router.push("/orders");
      }
    } catch (error) {
      console.error("Error creating invoice for order:", error);
    }
  }

  // Handle Order Placement
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      messageApi.warning("Your cart is empty!");
      return;
    }
    if (!user) {
      messageApi.error("User not logged in");
      return;
    }
    const orderItems: IOrderItem[] = cartItems.map((item: any) => {
      return {
        foodItem: item.foodItem._id,
        quantity: item.quantity,
        price: item.foodItem.discountedPrice,
      }
    });

    const invoiceItems: IInvoiceItem[] = cartItems.map((item: any) => {
      return {
        name: item.foodItem.name,
        description: item.foodItem.description,
        quantity: item.quantity,
        price: item.foodItem.discountedPrice,
        total: item.quantity * item.foodItem.discountedPrice
      }
    });

    const orderPayload: ICreateOrder = {
      user: user.id,
      phone: user.mobile,
      address: `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zipcode}`,
      restaurant: restauratnInCart._id,
      items: orderItems,
      totalPrice: total,
      paymentMethod,
      status: OrderStatusEnum.PENDING
    }

    const invoiceData: ICreateInvoice = {
      user: user.id,
      restaurant: restauratnInCart._id,
      order: "",
      items: invoiceItems,
      subTotal: subtotal,
      taxAmount: tax,
      deliveryCharge: deliveryFee,
      taxPercent: 12.5,
      totalAmount: total,
      status: InvoiceStatusEnum.UNPAID,
      dueDate: new Date().toISOString()
    }

    try {
      const res = await fetch(`${API_ENDPOINTS.orders}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const jsonResposne = await res.json();
      if (jsonResposne.success) {
        invoiceData.order = jsonResposne.data._id;
        await createInvoice(invoiceData);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-4/5 mx-auto my-10">
        {contextHolder}
        <h3 className='text-xl font-bold'>Delivery Details</h3>
        {/* Left Section - User Details & Payment */}
        <div className='flex gap-8 mt-2'>
          <div className="w-2/3">
            {user && (
              <>
                <Card title="User Info" className='shadow-md rounded-none p-2'>
                  <p className='mb-1'> <span>Name:</span> {`${user.firstName} ${user.lastName}`}</p>
                  <p className='mb-1'><span>Email:</span> {user.email}</p>
                  <p className='mb-1'><span>Mobile:</span> {user.mobile}</p>
                </Card>

                <Card title="Delivery address" className='shadow-md rounded-none mt-4 p-2'>
                  {user.address && user.address.street && user.address.city && user.address.state && user.address.zipcode ? (
                    <p> {`${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zipcode}`}</p>
                  ) : (
                    <>
                      <p className='text-red-500 mb-2'>Delivery address is missing. Please add it under your profile</p>
                      <Link className='border border-blue-500 py-1 px-6' href={"/profile"}>Visit Profile</Link>
                    </>
                  )}
                </Card>

                <Card title="Choose payment method" className='shadow-md rounded-none mt-4 p-2'>
                  <div>
                    <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <Radio value="COD">Cash on Delivery</Radio>
                      <Radio value="ONLINE">Online Payment</Radio>
                    </Radio.Group>
                  </div>
                  <div>
                    <button
                      className='uppercase bg-red-500 text-white w-full py-2 mt-6'
                      onClick={() => {
                        if (paymentMethod === 'COD') {
                          placeOrder()
                        } else {
                          //Handle payments here
                        }
                      }}
                    >
                      {paymentMethod === "COD" ? "Order" : "Proceed to pay"}
                    </button>
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Right Section - Price Breakdown */}
          <div className="w-1/3">
            {cartItems && cartItems.length && (
              <Card title="Order Details" className='shadow-md rounded-none'>
                {cartItems.map((item: any, index) => {
                  return (
                    <div key={item._id} className='flex justify-between mt-1'>
                      <p>
                        {/* <span className='mr-2'>{`${index + 1}.`}</span> */}
                        <span className='font-black text-md mr-1'>{item.foodItem.name}</span>
                        <span className='mr-1'>x</span>
                        <span>{item.quantity}</span>
                      </p>
                      <p>₹{item.foodItem.discountedPrice}</p>
                    </div>
                  )
                })}
              </Card>
            )}
            <Card title="Price Breakdown" className="shadow-md rounded-none">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (12.5%):</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage