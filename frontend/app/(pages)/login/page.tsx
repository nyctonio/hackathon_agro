'use client';
import { signOut, signIn } from 'next-auth/react';

const Login = () => {
  const signInHandler = () => {
    signIn('google', { callbackUrl: 'http://localhost:3000/panel' });
  };

  return (
    <div>
      <button onClick={signInHandler}>Sign in with Google</button>
    </div>
  );
};

export default Login;
