import { IInvoiceItem } from '@/models/invoice';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { IViewInvoice } from '@/utils/types';
import { EnvironmentOutlined, HomeOutlined } from '@ant-design/icons';
import { Card, Drawer, message } from 'antd';
import React, { FC, useEffect, useState } from 'react';

interface IProps {
  open: boolean,
  orderId: string;
  handleClose: () => void;
}

const ViewInvoice: FC<IProps> = ({ open, orderId, handleClose }) => {
  const [invoice, setInvoice] = useState<IViewInvoice>();
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  //  // Calculate Total Price
  //  const subtotal = invoice?.items.reduce((sum, item: any) => sum + item.proce * item.quantity, 0) || 0;
  //  const tax = subtotal * 0.125; // 12.5% tax
  //  const deliveryFee = subtotal > 500 ? 0 : 40; // Free delivery above ₹500
  //  const total = subtotal + tax + deliveryFee;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_ENDPOINTS.invoices}?orderId=${orderId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          setInvoice(jsonResponse.data[0]);
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

  return (
    <div>
      <Drawer
        title="Invoice Details"
        placement={'right'}
        closable={true}
        onClose={handleClose}
        open={open}
        size='large'
        loading={loading}
      >
        <h3 className='text-lg font-extrabold uppercase'>Order #{orderId}</h3>
        {invoice ? (
          <>
            <div className='my-6 flex justify-between items-center'>
              <div>
                <h3 className='text-2xl font-semibold'><EnvironmentOutlined />
                  <span className='text-lg font-bold ml-2'>{invoice.restaurant?.name}</span>
                </h3>
                <p className='text-sm ml-2'>{`${invoice.restaurant?.address?.street},${invoice.restaurant?.address?.zipcode}`}</p>
              </div>
              <div>
                <h3 className='text-2xl font-semibold'><HomeOutlined />
                  <span className='text-lg font-bold ml-2'>{`${invoice.user.firstName} ${invoice.user.lastName}`}</span>
                </h3>
                <p className='text-sm ml-2'>{`${invoice.user?.address?.street},${invoice.user?.address?.zipcode}`}</p>
              </div>
            </div>
            <hr />
            <div>
              {invoice.items.length && (
                <>
                  <div className='mt-4'>
                    {invoice.items.map((item: IInvoiceItem, index) => {
                      return (
                        <div key={index} className='flex justify-between mt-1'>
                          <p>
                            <span className='mr-2'>{`${index + 1}.`}</span>
                            <span className='font-black text-md mr-1'>{item.name}</span>
                            <span className='mr-1'>x</span>
                            <span>{item.quantity}</span>
                          </p>
                          <p>₹{item.price}</p>
                        </div>
                      )
                    })}
                  </div>
                  <div className='mt-4 border border-dashed'></div>
                  <div className='flex justify-between items-center mt-2'>
                    <p className='font-semibold'>Item Total:</p>
                    <p>₹{invoice.subTotal || 0}</p>
                  </div>
                  <div className="flex justify-between">
                    <span>{`Tax (${invoice.taxPercent ? invoice.taxPercent : 0} %): `}</span>
                    <span>₹{invoice.taxAmount || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>₹{invoice.deliveryCharge || 0}</span>
                  </div>
                  <hr className="my-2 border-dashed" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{invoice.totalAmount || 0}</span>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className='flex justify-start h-full items-start'>
            <h3 className='text-red-500 mt-2'>Invoice not found for this order</h3>
          </div>
        )}
      </Drawer>
    </div>
  )
}

export default ViewInvoice