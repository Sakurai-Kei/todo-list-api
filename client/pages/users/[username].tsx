import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SingleUser() {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  async function getUser() {
    const endpoint =
      process.env.NODE_ENV === 'production'
        ? `http://54.251.163.42/backend/user/${username}`
        : `http://localhost/backend/user/${username}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (!result) {
      setError('No user found');
      return;
    }

    setUser(result);
  }

  useEffect(() => {
    if (!user) {
      getUser();
    }
  });

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {!user && !error && <div>Loading...</div>}
      {user && <div>{JSON.stringify(user)}</div>}
      {!user && error && <div>{JSON.stringify(error)}</div>}
    </div>
  );
}
