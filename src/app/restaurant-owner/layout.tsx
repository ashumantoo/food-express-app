import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Food Express App",
  description: "A complete food delivery app for all your daily recipe",
};

export default function RestaurantOwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="bg-gray-200 w-screen">
          <div className="py-6 px-8">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}