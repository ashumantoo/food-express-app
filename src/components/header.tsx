'use client'
import { useCart } from '@/context/cart-context';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { RoleTypeEnum } from '@/utils/const';
import { LogoutOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const router = useRouter();
  const { cartCount } = useCart();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
      const userData = JSON.parse(user);
      setUsername(userData.firstName);
      setUserRole(userData.role);
    }
  });

  const handleLogout = async () => {
    try {
      const apiResponse = await fetch(API_ENDPOINTS.logout, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      const jsonResponse = await apiResponse.json();
      if (jsonResponse.success) {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        router.replace('/login');
        router.refresh(); // Force refresh to reflect changes immediately
        alert(jsonResponse.message);
      } else {
        alert(jsonResponse.message);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.message);
      throw error;
    }
  };

  return (
    <>
      <div className="h-16 px-8">
        <div className='flex items-center justify-between'>
          <Link href={!userRole ? "/" : userRole === RoleTypeEnum.USER ? '/' : '/restaurant-owner'}>
            <Image
              src="/logo.png"
              alt='Company Logo'
              width={70}
              height={70}
            />
          </Link>
          <nav className='mr-4 flex items-center gap-4'>
            {!isAuthenticated && <Link href={'/login'} className='text-lg'>LogIn</Link>}
            {!isAuthenticated && <Link href={'/register'} className='text-lg'>Register</Link>}
            {isAuthenticated && <Link
              href={userRole === RoleTypeEnum.USER ? '/profile' : '/restaurant-owner/settings'}
              className={'hover:text-red-500 text-lg'}><UserOutlined style={{ fontSize: '120%', marginRight: 4 }} />
              {username}
            </Link>}
            {isAuthenticated && userRole === RoleTypeEnum.USER && <Link href={'/cart'} className='text-lg hover:text-red-500'>
              Cart <span className='bg-red-500 text-white px-1'>{cartCount}</span>
            </Link>}
            {isAuthenticated && userRole === RoleTypeEnum.USER && <Link href={'/orders'} className='text-lg hover:text-red-500'>Orders</Link>}
            {isAuthenticated && <button className='text-lg hover:text-red-500' onClick={handleLogout}><LogoutOutlined /> Logout</button>}
          </nav>
        </div>
      </div>
      <div className='h-0.5 bg-red-500'></div>
    </>
  )
}

export default Header