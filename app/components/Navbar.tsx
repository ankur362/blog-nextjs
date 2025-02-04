import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">
          Blog App
        </Link>
        <Link 
          href="/posts/create" 
          className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-700"
        >
          Create Blog
        </Link>
      </div>
    </nav>
  );
}