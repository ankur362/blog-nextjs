"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Post } from "@/app/lib/db";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("search") || "");
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  // Fetch posts from db.json
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/db.json'); // Update with the correct path
      const data = (await response.json()) as { posts?: Post[] };
      setPosts(data.posts || []); // Ensure posts is an array
    };
    fetchPosts();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = search.trim() ? `?search=${encodeURIComponent(search)}` : "";
    router.push(`/${query}`);
  };

  // Filter posts based on search query
  const filteredPosts = Array.isArray(posts) ? posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase())
  ) : [];

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-[155px] bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Search
        </button>
      </form>
      <div>
      {filteredPosts.map(post => (
  <div key={post.id} className="border  rounded-lg w-[280px] shadow-md p-4 mb-4 transition-transform transform hover:scale-105">
    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
    <p className="text-gray-700 mb-2">{post.content}</p>
    <p className="text-sm text-gray-500">Author: {post.author}</p>
    <p className="text-sm text-gray-500">Published on: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</p>
  </div>
))}
      </div>
    </div>
  );
}
