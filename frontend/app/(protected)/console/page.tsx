'use client';

import { useSession } from 'next-auth/react';

function page() {
  const session = useSession({ required: true });
  return <>page</>;
}

export default page;
