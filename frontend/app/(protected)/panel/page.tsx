'use client';
import Navbar from '@/components/console/common/navbar';
import Sidebar from '@/components/console/common/sidebar';
import { useSession } from 'next-auth/react';

function page() {
  // const session = useSession({ required: true });
  return (
    <>
      <div className="flex flex-row">
        <div className="w-[18%]">
          <Sidebar />
        </div>
        <div className="flex flex-col w-[100%] h-screen">
          <Navbar />
          <div className="bg-[#f3f4f6] h-[90%] overflow-y-scroll">
            <div>Hey</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
