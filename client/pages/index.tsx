import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div>Hello, world! Welcome to frontend Client</div>
      <Link href={'/users'}>
        <a>List of all users</a>
      </Link>
    </div>
  );
}
