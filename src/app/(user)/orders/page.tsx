"use client";
import Header from '@/components/header'
import React from 'react'
import { useEffect, useState } from "react";
import { Table, Tag, Spin, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { API_ENDPOINTS } from "@/utils/api-endpoints";
import { useRouter } from "next/navigation";
import { IUserOrder } from '@/utils/types';
import { OrderStatusEnum, PaymentMethodEnum } from '@/utils/const';

const UserOrders = () => {
  const [orders, setOrders] = useState<IUserOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.orders, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          setOrders(jsonResponse.data);
        } else {
          messageApi.error("Failed to fetch orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        messageApi.error("Error fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns: ColumnsType<IUserOrder> = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <span className="font-medium text-gray-700">{id}</span>,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `₹${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === OrderStatusEnum.PENDING
            ? "orange"
            : status === OrderStatusEnum.PROCESSING
              ? "blue"
              : status === OrderStatusEnum.DELIVERED
                ? "green"
                : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => (
        <ul>
          {items.map((item: any, index: number) => (
            <li key={index} className="text-gray-600">
              {item.foodItem.name} × {item.quantity}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Payment",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => (
        <span className="font-semibold">
          {method === PaymentMethodEnum.COD ? "Cash on Delivery" : "Online Payment"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => router.push(`/orders/${record._id}`)}
          className="bg-red-500 text-white px-3 py-1 hover:bg-red-600"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        {contextHolder}
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {loading ? (
          <Spin className="flex justify-center items-center h-40" />
        ) : (
          <Table columns={columns} dataSource={orders} rowKey="_id" pagination={{ pageSize: 5 }} />
        )}
      </div>
    </div>
  )
}

export default UserOrders