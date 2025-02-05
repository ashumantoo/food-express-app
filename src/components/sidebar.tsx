'use client';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import Link from 'next/link';
import {
  CreditCardFilled,
  DashboardFilled,
  QqSquareFilled,
  SettingFilled,
  TruckFilled,
  WalletFilled
} from '@ant-design/icons';

const Sidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div
        className={`${isOpen ? 'w-56' : 'w-16'
          } h-screen bg-white text-black p-4 transition-all duration-300 flex flex-col`}
      >
        <nav className="flex flex-col space-y-4">
          <SidebarLink href="/restaurant-owner/dashboard" icon={<DashboardFilled />} label="Dashboard" isOpen={isOpen} pathname={pathname} />
          <SidebarLink href="/restaurant-owner/customers" icon={<QqSquareFilled />} label="Customers" isOpen={isOpen} pathname={pathname} />
          <SidebarLink href="/restaurant-owner/menu" icon={<CreditCardFilled />} label="Food Menu" isOpen={isOpen} pathname={pathname} />
          <SidebarLink href="/restaurant-owner/orders" icon={<TruckFilled />} label="Orders" isOpen={isOpen} pathname={pathname} />
          <SidebarLink href="/restaurant-owner/invoices" icon={<WalletFilled />} label="Invoices" isOpen={isOpen} pathname={pathname} />
          <SidebarLink href="/restaurant-owner/settings" icon={<SettingFilled />} label="Settings" isOpen={isOpen} pathname={pathname} />
        </nav>
      </div>
    </div>
  );
};

interface IProps {
  href: string;
  icon: any;
  label: string;
  isOpen: boolean;
  pathname: string;
}

const SidebarLink: FC<IProps> = ({ href, icon, label, isOpen, pathname }) => {
  const isActive = pathname === href;
  return (
    <Link href={href} className={`flex items-center space-x-3 p-2 rounded-md ${isActive ? 'bg-red-500 text-white' : 'hover:bg-red-500 hover:text-white'}`}>
      <span>{icon}</span>
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default Sidebar;
