'use client';
import Navbar from '@/components/panel/common/navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Home from '@/components/panel/common/home';
import { useState } from 'react';

function Page() {
  const { status } = useSession();
  const [navLink, setNavLink] = useState('home');
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
          <Navbar navLink={navLink} setNavLink={setNavLink} />
          <div className="bg-[#f3f4f6] h-[100%] overflow-y-scroll">
            {navLink == 'home' ? <Home /> : <div>Alert</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
