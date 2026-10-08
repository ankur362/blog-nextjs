'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost } from '../lib/db';

export default function DeleteModal({ postId }: { postId: string | number }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      router.push('/');
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-red-500 text-white p-2 ml-8 rounded-lg w-[65px] text-center hover:bg-red-700"
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h2>Are you sure you want to delete this post?</h2>
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={handleDelete} 
                className="bg-red-500 text-white p-2"
              >
                Confirm Delete
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="bg-gray-300 p-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
