'use client'
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { OrderStatusEnum } from '@/utils/const';
import { IViewInvoice } from '@/utils/types';
import { Input, Modal, Select, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react'

const Invoices = () => {
  const [invoices, setInvoices] = useState<IViewInvoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [viewPayment, setViewPayment] = useState(false);
  const [selectInvoiceId, setSelectedInvoiceId] = useState("");
  const [paidVia, setPaidVia] = useState('CASH');
  const [selectedInvoice, setSelectedInvoice] = useState<IViewInvoice>();

  const getRestaurantInvoices = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.restaurant_owner.invoices}`, {
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

  const updateOrderStatus = async (data: any) => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.restaurant_owner.invoices}?invoiceId=${selectedInvoice?._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const jsonResponse = await apiResponse.json();
      if (jsonResponse.success) {
        setOpen(false);
        setLoading(false);

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
    getRestaurantInvoices().then((data) => {
      setInvoices(data);
      setLoading(false);
    }).catch((error) => {
      alert(error.message);
      setLoading(false);
      console.log(error);
    });
  }, []);


  const columns: ColumnsType<IViewInvoice> = [
    {
      title: "Invoice ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <span className="font-medium text-gray-700">{id}</span>,
    },
    {
      title: "Order ID",
      dataIndex: "order",
      key: "order",
      render: (id) => <span className="font-medium text-gray-700">{id}</span>,
    },
    {
      title: "Total Price",
      dataIndex: "totalAmount",
      key: "totalAmount",
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
              {item.name} × {item.quantity}
            </li>
          ))}
        </ul>
      ),
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
      title: "Actions",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <>
          <button
            onClick={() => {
              setOpen(true);
              setSelectedInvoice(record);
            }}
            className="bg-red-500 text-white px-3 py-1 hover:bg-red-600 rounded-md"
          >
            Mark Paid
          </button>
          <button
            onClick={() => {
              setSelectedInvoiceId(record._id)
              setViewPayment(true)
            }}
            className="border border-red-500 text-red-500 px-3 rounded-md py-1 ml-2 hover:bg-red-100"
          >
            View Payment
          </button>
        </>
      ),
    },
  ];


  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      </div>
      <Table
        columns={columns}
        dataSource={invoices}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        className='mt-2 rounded-none'
      />
      {open && (
        <Modal
          title="Add Payment"
          centered
          open={open}
          onOk={() => updateOrderStatus({})}
          onCancel={() => setOpen(false)}
          footer={[
            <button key={"cancel"} className='border border-red-500 py-1 px-4 ml-2 rounded-md text-red-500' onClick={() => setOpen(false)}>Cancel</button>,
            <button key={"confirm"} className='bg-red-500 py-1 px-4 ml-4 mt-2 text-white rounded-md' onClick={() => updateOrderStatus({})}>Pay</button>
          ]}
        >
          <hr />
          <div className='mt-4'>
            <label htmlFor="amount">Payable Amount</label>
            <Input className='mt-1' type="number" name='amount' id='amount' value={selectedInvoice?.totalAmount} disabled />
          </div>
          <div className='mt-4'>
            <label htmlFor="amount">Choose payment method</label>
            <div className='mt-1'>
              <Select
                value={paidVia}
                className='w-full'
                onChange={(value) => {
                  setPaidVia(value);
                }}
                options={[
                  { value: "CASH", label: 'Cash' },
                  { value: "CARD", label: 'Card' }
                ]}
              />
            </div>
          </div>
        </Modal>
      )}

      {viewPayment && (
        <Modal
          title="Payment Details"
          centered
          open={viewPayment}
          onCancel={() => setViewPayment(false)}
          closable={false}
          footer={[
            <button key={"cancel"} className='border border-red-500 py-1 px-4 ml-2 rounded-md text-red-500' onClick={() => setViewPayment(false)}>Cancel</button>,
            <button key={"confirm"} className='bg-red-500 py-1 px-4 ml-4 mt-2 text-white rounded-md' onClick={() => setViewPayment(false)}>Ok</button>
          ]}
        >
          <hr />
          <h3>Show payment details info here</h3>
        </Modal>
      )}
    </div>
  )
}

export default Invoices