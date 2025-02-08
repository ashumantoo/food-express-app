'use client'
import React from 'react';
import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Link from "next/link";
import { IMenu } from '@/utils/types';
import { API_ENDPOINTS } from '@/utils/api-endpoints';

const FoodMenu = () => {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getMenus = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.menu}`, {
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

  useEffect(() => {
    getMenus().then((data) => {
      setMenus(data);
      setLoading(false);
    }).catch((error) => {
      alert(error.message);
      setLoading(false);
      console.log(error);
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
      render: (price: number) => `₹${price.toFixed(2)}`,
    },
    {
      title: "Discounted Price",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (discountedPrice: number) => `₹${discountedPrice.toFixed(2)}`,
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
      render: (_: any, record: IMenu) => (
        <Link href={`/restaurant-owner/menu/${record._id}`}>
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
        dataSource={menus}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        className='mt-2'
      />
    </div >
  );
}

export default FoodMenu