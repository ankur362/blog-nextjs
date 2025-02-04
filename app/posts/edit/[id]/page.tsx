'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPostById, updatePost } from '@/app/lib/db';

export default function EditPost({ params }) {
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadPost = async () => {
      const post = await fetchPostById(params.id);
      setFormData(post);
    };
    loadPost();
  }, [params.id]);

  if (!formData) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(params.id, formData);
      router.push(`/posts/${params.id}`);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        className="w-full p-2 mb-4 border"
      />
      <input
        type="text"
        value={formData.author}
        onChange={(e) => setFormData({...formData, author: e.target.value})}
        className="w-full p-2 mb-4 border"
      />
      <textarea
        value={formData.content}
        onChange={(e) => setFormData({...formData, content: e.target.value})}
        className="w-full p-2 mb-4 border h-48"
      />
      <button type="submit" className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-700 ">
        Update Post
      </button>
    </form>
  );
}