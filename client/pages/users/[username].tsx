import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  name: string;
}

interface User {
  name: string;
  tasks: Task[];
}

export default function SingleUser() {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState<User>({
    name: '',
    tasks: [],
  });
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
    const result: User = await response.json();

    if (!result) {
      setError('No user found');
      return;
    }

    setUser(result);
  }

  useEffect(() => {
    if (!user.name) {
      getUser();
    }
  });

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-300">
      {!user.name && !error && <div>Loading...</div>}
      {user && user.name && !error && (
        <div>
          <div>Username: {user.name}</div>
          <div>Tasks</div>
          <ul className="flex flex-col gap-1">
            {user &&
              user.tasks.length !== 0 &&
              user.tasks.map((task) => {
                return <li key={task.id as number}>{task.title}</li>;
              })}
          </ul>
        </div>
      )}
      {!user && error && <div>{JSON.stringify(error)}</div>}
    </div>
  );
}
