import { Dropdown, MenuProps, Skeleton } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useState } from 'react';

function Navbar() {
  const session = useSession();
  if (session.status === 'loading')
    return <Skeleton active paragraph={{ rows: 1 }} />;
  console.log(session);

  const signOutHandler = () => {
    signOut();
  };

  const [selected, setSelected] = useState('home');

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <button>Logout</button>,
      onClick: () => {
        signOutHandler();
      },
    },
  ];

  return (
    <div className="sticky bg-[#092629] top-0 flex flex-row justify-between items-center py-2 shadow-md w-full px-8">
      <div className="left flex flex-row justify-around space-x-4">
        {selected == 'home' ? (
          <div className="home">
            <button className="bg-[#fdedd2] text-[#092629] flex flex-row space-x-2 justify-around items-center px-4 rounded-md py-2">
              <div className="icon">
                <img src="assets/home_icon.svg" alt="" className="h-5 w-5" />
              </div>
              <div className="font-extrabold">Home</div>
            </button>
          </div>
        ) : (
          <div
            className="home"
            onClick={() => {
              console.log('setting selected to ', selected);
              setSelected('home');
            }}
          >
            <button className="flex flex-row space-x-2 text-[#fdedd2] justify-around items-center px-4 rounded-md py-2">
              <div className="icon">
                <img src="assets/home_white.svg" alt="" className="h-5 w-5" />
              </div>
              <div className="font-extrabold">Home</div>
            </button>
          </div>
        )}

        {selected == 'alert' ? (
          <div className="alert">
            <button className="bg-[#fdedd2] text-[#092629] flex flex-row space-x-2 justify-around items-center px-4 rounded-md py-2">
              <div className="icon">
                <img src="assets/alert_icon.svg" alt="" className="h-5 w-5" />
              </div>
              <div className="font-extrabold">Alerts</div>
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setSelected('alert');
            }}
          >
            <button className=" text-[#fdedd2] flex flex-row space-x-2 justify-around items-center px-4 rounded-md py-2">
              <div className="icon">
                <img src="assets/alert_white.svg" alt="" className="h-5 w-5" />
              </div>
              <div className="font-extrabold">Alerts</div>
            </button>
          </div>
        )}
      </div>
      <div className="right flex flex-row items-center space-x-3">
        <div className="hover:cursor-pointer">
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            arrow
            placement="bottomRight"
          >
            <img
              src={session.data?.user?.image || 'https://avatar.vercel.sh/1'}
              className="h-10 w-10 rounded-full"
              alt=""
            />
          </Dropdown>
        </div>
        <div
          className="text-[#fdedd2] text-2xl font-bold
        "
        >
          AgroAI
        </div>
      </div>
    </div>
  );
}

export default Navbar;
