'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/app/lib/db';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: ''
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const post = await createPost(formData);
      router.push(`/posts/${post.id}`);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        className="w-full p-2 mb-4 border"
      />
      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => setFormData({...formData, author: e.target.value})}
        className="w-full p-2 mb-4 border"
      />
      <textarea
        placeholder="Content"
        value={formData.content}
        onChange={(e) => setFormData({...formData, content: e.target.value})}
        className="w-full p-2 mb-4 border h-48 min-h-[150px]"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700">
        Create Post
      </button>
    </form>
  );
}