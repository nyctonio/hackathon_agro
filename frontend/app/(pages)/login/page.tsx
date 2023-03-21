'use client';
import { signOut, signIn } from 'next-auth/react';

const Login = () => {
  const signInHandler = () => {
    signIn('google', { callbackUrl: 'https://agroai.ritesh.kr/panel' });
  };

  return (
    <div>
      <button onClick={signInHandler}>Sign in with Google</button>
    </div>
  );
};

export default Login;
