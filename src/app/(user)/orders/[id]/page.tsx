'use client'
import Header from '@/components/header';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { OrderStatusEnum, PaymentMethodEnum } from '@/utils/const';
import { IUserOrder } from '@/utils/types';
import { message, Spin, Tag } from 'antd';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UserOrderDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<IUserOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.orders}/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          setOrder(jsonResponse.data);
        } else {
          messageApi.error("Failed to fetch order details.");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        messageApi.error("Error fetching order details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 px-12">
        {contextHolder}
        {loading ? (
          <Spin className="flex justify-center items-center h-40" />
        ) : order ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <span onClick={() => router.back()} className='text-md text-blue-600 hover:cursor-pointer hover:underline mb-4'>Back</span> <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="border p-4 rounded-md">
              <p className="text-gray-600"><strong>Order ID:</strong> {order._id}</p>
              <p className="text-gray-600"><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              <p className="text-gray-600">
                <strong>Status:</strong>{" "}
                <Tag color={
                  order.status === OrderStatusEnum.PENDING
                    ? "orange"
                    : order.status === OrderStatusEnum.PROCESSING
                      ? "blue"
                      : order.status === OrderStatusEnum.DELIVERED
                        ? "green"
                        : "red"
                }>
                  {order.status.toUpperCase()}
                </Tag>
              </p>
              <p className="text-gray-600">
                <strong>Payment Method:</strong> {order.paymentMethod === PaymentMethodEnum.COD ? "Cash on Delivery" : "Online Payment"}
              </p>
              <p className="text-gray-600"><strong>Delivery Address:</strong> {order.address}</p>
            </div>

            <h3 className="text-xl font-semibold mt-6">Order Items</h3>
            <div className="mt-2 border p-4 rounded-md">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 mb-2">
                  <div>
                    <p className="text-lg font-medium">{item.foodItem.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{item.foodItem.discountedPrice * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Order not found.</p>
        )}
      </div>
    </div>
  )
}

export default UserOrderDetailsPage