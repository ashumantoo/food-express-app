'use client'
import React from 'react';
import { useEffect, useState } from "react";
import { Table, Button, Image } from "antd";
import Link from "next/link";
import { IMenu } from '@/utils/types';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { MenuCategoriesEnum, MenuCategoriesValue } from '@/utils/const';
import { DeleteFilled, DeleteOutlined, EditFilled, EditOutlined } from '@ant-design/icons';

const FoodMenu = () => {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getMenus = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.restaurant_owner.menu}`, {
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
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) => (<Image src={imageUrl} height={50} width={50} />)
    },
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
      render: (category: MenuCategoriesEnum) => (
        <span className={`px-4 py-1 rounded-md shadow-md ${category === MenuCategoriesEnum.VEG ? 'bg-green-300' : 'bg-red-300'}`}>{MenuCategoriesValue[category]}</span>
      )
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
        <div>
          <Link href={`/restaurant-owner/menu/${record._id}`}>
            <button className='text-blue-500' title='Edit'><EditFilled className='text-lg' /></button>
          </Link>
          <button className='ml-4 text-red-400' title='Delete'><DeleteFilled className='text-lg' /></button>
        </div>

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