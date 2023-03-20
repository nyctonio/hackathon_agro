'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
export default function Home() {
  const session = useSession();
  const URL = process.env.NEXT_PUBLIC_BACKEND;
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${URL}/get-user-polygon/${session.data?.user?.email}`
      );
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <a
      href={`${process.env.NEXT_PUBLIC_BACKEND}?email=${session.data?.user?.email}`}
    >
      Create a Polygon
    </a>
  );
}
