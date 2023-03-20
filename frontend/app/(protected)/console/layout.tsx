'use client';
import Navbar from '@/components/console/common/navbar';
import Sidebar from '@/components/console/common/sidebar';
import AuthContext from 'app/provider';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import '../../../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <body className="">
        <AuthContext>
          <Toaster />
          <div className="flex flex-row">
            <div className="w-[18%]">
              <Sidebar />
            </div>
            <div className="flex flex-col w-[100%] h-screen">
              <Navbar />
              <div className="bg-[#f3f4f6] h-[90%] overflow-y-scroll">
                {children}
              </div>
            </div>
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
