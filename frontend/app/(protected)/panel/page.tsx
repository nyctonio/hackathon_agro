'use client';
import Navbar from '@/components/panel/common/navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Home from '@/components/panel/common/home';

function page() {
  const { status } = useSession();
  const router = useRouter();
  if (status === 'loading') return <div>Loading...</div>;
  else if (status === 'unauthenticated') {
    router.push('/login');
    return <div>Unauthenticated</div>;
  }
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-[100%] h-screen">
          <Navbar />
          <div className="bg-[#f3f4f6] h-[100%] overflow-y-scroll">
            <Home />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
