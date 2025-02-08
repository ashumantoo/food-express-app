'use client'
import React from 'react';
import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Link from "next/link";
import { MenuItem } from '@/utils/types';

const FoodMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Available",
      dataIndex: "isAvailable",
      key: "isAvailable",
      render: (isAvailable: boolean) => (isAvailable ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: MenuItem) => (
        <Link href={`restaurant-owner/menu/${record._id}`}>
          <Button type="link">Edit</Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold mb-4">Food Menu</h1>
        <Link href="/restaurant-owner/menu/new">
          <button className="mb-4 bg-red-500 text-white px-6 py-2 rounded-md">Add New Menu</button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={menuItems}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className='mt-2'
      />
    </div >
  );
}

export default FoodMenu