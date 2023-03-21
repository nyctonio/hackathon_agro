'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Card = (props: any) => {
  console.log(props);
  return (
    <div className="py-6">
      <div className="flex bg-white shadow-lg rounded-sm overflow-hidden">
        <div
          className="w-1/3 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="w-2/3 p-4 py-6">
          <h1 className="text-gray-900 font-bold text-2xl">
            Field Name: {props.item.name}
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Area: {props.item.area.hectares} hectares.
          </p>
          <div className="flex item-center mt-2"></div>
          <div className="flex item-center justify-between mt-3">
            <h1 className="text-gray-700 font-bold text-xl">2 Notification</h1>
            <Link
              href={`/farm/${props.item.id}`}
              className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
            >
              View Detailed Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const [polygon, setPolygon] = useState([]);
  const URL = process.env.NEXT_PUBLIC_BACKEND;
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${URL}/get-user-polygon/${session.data?.user?.email}`
      );
      const data = await response.json();
      setIsLoading(false);
      setPolygon(data.data);
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="px-10 py-10">
        <h1 className="text-4xl">Home</h1>
        <a
          href={`${process.env.NEXT_PUBLIC_BACKEND}?email=${session.data?.user?.email}`}
        >
          <div className="flex hover:bg-black hover:text-[#fdedd2] py-2 px-10 mt-10 w-full text-black border-[2px] border-black rounded-sm">
            {/* svg of plus icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <div className="flex justify-center font-extrabold items-center text-xl md:text-3xl">
              Create Your Farm
            </div>
          </div>
        </a>
        {isLoading ? <div className="mt-10">Loading...</div> : <></>}
        {polygon.map((item, index) => {
          return <Card key={index} item={item} />;
        })}
      </div>
    </div>
  );
}
