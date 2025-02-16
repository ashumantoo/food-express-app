'use client';
import Header from '@/components/header'
import { useCart } from '@/context/cart-context';
import React from 'react'
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Image, Table, message } from "antd";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const { cartItems, restauratnInCart, addToCart, removeFromCart } = useCart();


  // Increase quantity
  const handleIncrease = (item: any) => {
    if (restauratnInCart && restauratnInCart._id) {
      addToCart({
        restaurant: restauratnInCart._id,
        foodItem: item.foodItem._id,
        quantity: item.quantity + 1,
        price: item.foodItem.discountedPrice,
        isRemoving: false
      })
    }
  };

  // Decrease quantity
  const handleDecrease = (item: any) => {
    if (item.quantity > 1 && restauratnInCart && restauratnInCart._id) {
      addToCart({
        restaurant: restauratnInCart._id,
        foodItem: item.foodItem._id,
        quantity: item.quantity - 1,
        price: item.foodItem.discountedPrice,
        isRemoving: false
      });
    } else {
      removeFromCart(item.foodItem._id, item.foodItem.discountedPrice, false);
    }
  };

  // Remove item from cart
  const handleRemoveItem = (item: any) => {
    removeFromCart(item.foodItem._id, item.foodItem.discountedPrice, false);
    messageApi.success(`${item.foodItem.name} removed from cart`);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum: number, item: any) => sum + item.foodItem.discountedPrice * item.quantity,
    0
  );

  // Place order
  const proceedCheckout = () => {
    if (cartItems.length === 0) {
      messageApi.warning("Your cart is empty!");
      return;
    }
    router.push("/checkout"); // Redirect to orders page
  };


  // Table columns for Ant Design Table
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => (
        <Image src={record.foodItem.imageUrl} width={80} height={80} alt={record.foodItem.name} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => <span className="font-semibold">{record.foodItem.name}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_: any, record: any) => `₹${record.foodItem.discountedPrice}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <button className='h-6 w-6 rounded-sm border border-gray-300' onClick={() => handleDecrease(record)}>
            <MinusOutlined />
          </button>
          <span className="text-lg font-semibold">{record.quantity}</span>
          <button className='h-6 w-6 rounded-sm border border-gray-300' onClick={() => handleIncrease(record)}>
            <PlusOutlined />
          </button>
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_: any, record: any) => `₹${record.foodItem.discountedPrice * record.quantity}`,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <button className='h-6 w-6 text-red-500 border rounded-sm border-red-500' onClick={() => handleRemoveItem(record)}>
          <DeleteOutlined />
        </button>
      ),
    },
  ];

  return (
    <div className='h-screen'>
      {contextHolder}
      <Header />
      <div className="w-3/5 mx-auto my-10">
        <div className='flex items-center justify-between mb-2'>
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => { router.push(`/restaurants/${restauratnInCart._id}`) }}>
            {restauratnInCart && restauratnInCart.restaurantImage && (
              <Image src={restauratnInCart.restaurantImage} width={40} height={40} alt={restauratnInCart.name} preview={false} />
            )}
            <div>
              <p className='font-bold text-lg'>{restauratnInCart.name}</p>
              <p className='font-normal text-sm'>{restauratnInCart.address.street}</p>
            </div>
          </div>
        </div>
        <Table
          dataSource={cartItems}
          columns={columns}
          rowKey={(record: any) => record.foodItem._id}
          pagination={false}
          className='shadow-lg'
        />

        {/* Total & Place Order */}
        <div className="flex justify-between items-center mt-6">
          <h3 className="text-xl font-semibold">Total: ₹{totalPrice}</h3>
          <button className='bg-red-500 text-white py-2 px-4 uppercase hover:bg-red-600 hover:shadow-md' onClick={proceedCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage