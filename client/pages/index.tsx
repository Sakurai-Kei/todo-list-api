import Link from 'next/link';
import { useState, FormEvent } from 'react';

export default function Home() {
  const [findUserForm, setFindUserForm] = useState('');

  function onUserFormChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    setFindUserForm(value);
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-300">
      <div>Hello, world! Welcome to frontend Client</div>
      <div className="flex gap-2">
        <Link href={'/register'}>
          <a className="p-2 bg-blue-500 rounded-md shadow-sm text-white hover:text-black">
            Register User
          </a>
        </Link>
        <Link href={'/createTask'}>
          <a className="p-2 bg-blue-500 rounded-md shadow-sm text-white hover:text-black">
            Create a Task
          </a>
        </Link>
      </div>
      <section>
        <form
          method="GET"
          action={`/users/${findUserForm}`}
          className="flex flex-col"
        >
          <div>
            <label htmlFor="name">Find User</label>
            <input
              onChange={onUserFormChange}
              type="string"
              id="name"
              name="name"
              className="rounded-md m-2 p-2"
            />
          </div>
          <Link href={`/users/${findUserForm}`}>
            <a className="w-full p-2 bg-blue-500 rounded-md shadow-sm text-white text-center hover:text-black">
              Find
            </a>
          </Link>
        </form>
      </section>
    </div>
  );
}
