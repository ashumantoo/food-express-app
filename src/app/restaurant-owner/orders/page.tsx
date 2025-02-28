'use client'
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { OrderStatusEnum, PaymentMethodEnum } from '@/utils/const';
import { IUserOrder } from '@/utils/types';
import { MobileFilled, MobileOutlined, MobileTwoTone } from '@ant-design/icons';
import { Modal, Select, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<IUserOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [orderCurrentStatus, setOrderCurrentStatus] = useState<OrderStatusEnum>();
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const getRestaurantOrders = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.restaurant_owner.order}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const jsonResponse = await apiResponse.json();
      if (jsonResponse.success) {
        return jsonResponse.data;
      } else {
        alert(jsonResponse.message);
        throw new Error(jsonResponse.message);
      }
    } catch (error: any) {
      console.log("Error while fetching menus--->", error);
      setLoading(false);
      throw error;
    }
  }

  const updateOrderStatus = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.restaurant_owner.order}?orderId=${selectedOrderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: orderCurrentStatus })
      });

      const jsonResponse = await apiResponse.json();
      if (jsonResponse.success) {
        setOpen(false);
        setLoading(false);
        getRestaurantOrders().then((data) => {
          setOrders(data);
          setLoading(false);
        }).catch((error) => {
          alert(error.message);
          setLoading(false);
          console.log(error);
        });
      } else {
        alert(jsonResponse.message);
        throw new Error(jsonResponse.message);
      }
    } catch (error) {
      console.log("Error while updating order status--->", error);
      setLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    getRestaurantOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    }).catch((error) => {
      alert(error.message);
      setLoading(false);
      console.log(error);
    });
  }, []);


  const columns: ColumnsType<IUserOrder> = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <span className="font-medium text-gray-700">{id}</span>,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_, record) => <>
        <p className="font-medium text-gray-700">{`${record.user?.firstName} ${record.user?.lastName}`}</p>
        <p><MobileTwoTone /> {record.user?.mobile}</p>
      </>,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `₹${price}`,
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
      title: "Current Status",
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
      title: "Actions",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <>
          <Select
            value={status}
            className='w-36'
            onChange={(value) => {
              if (value !== status) {
                setOrderCurrentStatus(value);
                setSelectedOrderId(record._id);
                setOpen(true);
              }
            }}
            options={[
              { value: OrderStatusEnum.PENDING, label: 'Pending' },
              { value: OrderStatusEnum.PROCESSING, label: 'Processing' },
              { value: OrderStatusEnum.DELIVERED, label: 'Delivred' },
              { value: OrderStatusEnum.CANCELLED, label: 'Cancelled' },
            ]}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        className='mt-2 rounded-none'
      />
      <Modal
        title="Update order status"
        centered
        open={open}
        onOk={() => updateOrderStatus()}
        onCancel={() => setOpen(false)}
        footer={[
          <button key={"cancel"} className='border border-red-500 py-1 px-4 ml-2 rounded-md text-red-500' onClick={() => setOpen(false)}>Cancel</button>,
          <button key={"confirm"} className='bg-red-500 py-1 px-4 ml-4 mt-2 text-white rounded-md' onClick={() => updateOrderStatus()}>Confirm</button>
        ]}
      >
        <h3>Are you sure, you want to update the status of the order?</h3>
      </Modal>
    </div>
  )
}

export default Orders