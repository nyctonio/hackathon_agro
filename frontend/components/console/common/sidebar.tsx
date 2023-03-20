import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
  barColors: {
    '0': '#000',
    '1.0': '#000011',
  },
  shadowBlur: 5,
});

function Sidebar() {
  const [selected, setSelected] = useState('dashboard');
  const [showTopBar, setShowTopBar] = useState<boolean>(true);
  const pathname = usePathname();
  const session = useSession();
  useEffect(() => {
    if (pathname == '/admin') {
      setSelected('dashboard');
    }
    if (pathname == '/admin/members') {
      setSelected('members');
    }
    if (pathname == '/admin/events') {
      setSelected('events');
    }
    if (pathname == '/admin/users') {
      setSelected('users');
    }
    if (pathname == '/admin/power') {
      setSelected('power');
    }
    if (pathname == '/admin/contacts') {
      setSelected('contacts');
    }

    if (pathname == '/admin/bouncer') {
      setSelected('bouncer');
    }

    setShowTopBar(true);
    setTimeout(() => {
      setShowTopBar(false);
    }, 100);
  }, [pathname]);

  return (
    <div className="h-screen overflow-y-scroll py-4 shadow-xl flex flex-col space-y-12">
      {showTopBar && <TopBarProgress />}
      <div className="logo flex flex-row justify-center">
        <div>
          <img
            src="https://raw.githubusercontent.com/karanchugh02/gfgTemp/main/homePage/logo1.png"
            className="h-36"
          />
        </div>
      </div>

      <div className="functions px-10 font-semibold flex-col flex space-y-4 text-lg">
        <Link href={'/admin'}>
          <div
            className={'flex flex-row space-x-2 items-center'}
            onClick={() => {
              setSelected('dashboard');
            }}
          >
            <div className={selected == 'dashboard' ? 'text-gfg' : ''}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </div>
            <div className={selected == 'dashboard' ? 'text-gfg' : ''}>
              Dashboard
            </div>
          </div>
        </Link>

        <Link href={'/admin/members'}>
          <div
            className={'flex flex-row space-x-2 items-center'}
            onClick={() => {
              setSelected('members');
            }}
          >
            <div className={selected == 'members' ? 'text-gfg' : ''}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <div className={selected == 'members' ? 'text-gfg' : ''}>
              Members
            </div>
          </div>
        </Link>

        <Link href={'/admin/events'}>
          <div
            className={'flex flex-row space-x-2 items-center'}
            onClick={() => {
              setSelected('events');
            }}
          >
            <div className={selected == 'events' ? 'text-gfg' : ''}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
            </div>
            <div className={selected == 'events' ? 'text-gfg' : ''}>Events</div>
          </div>
        </Link>
      </div>

      <div className="blank"></div>
    </div>
  );
}

export default Sidebar;
