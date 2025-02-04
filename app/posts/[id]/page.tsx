import { fetchPostById } from '@/app/lib/db';
import DeleteModal from '@/app/components/DeleteModal';
import Link from 'next/link';

export default async function PostPage({ params }) {
    const paramsAwaited = await params;
    const post = await fetchPostById(paramsAwaited.id);
  
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4 flex gap-3"><p className="text-gray-600">Title:-</p>{post.title}</h1>
      <p className=" mb-2 flex gap-2"><p className="text-gray-600">Author</p> {post.author}</p>
      <div className="my-4 flex gap-2"><p className="text-gray-600">Content</p>{post.content}</div>
      <div className="flex gap-2">
        <Link href={`/posts/edit/${post.id}`} className="bg-yellow-500 p-2 rounded-lg w-[65px] text-center hover:bg-yellow-700">
          Edit
        </Link>
        <DeleteModal postId={post.id} />
      </div>
    </div>
  );
}