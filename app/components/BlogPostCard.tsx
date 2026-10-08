import Link from 'next/link';
import type { Post } from '@/app/lib/db';

type BlogPostCardProps = {
  post: Post;
  className?: string;
};

export default function BlogPostCard({ post, className }: BlogPostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className={className ? `block ${className}` : 'block'}>
      <div className="border p-4 hover:shadow-lg transition">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-gray-600">By {post.author}</p>
        <p className="mt-2 text-gray-500">
          {post.content.slice(0, 100)}...
        </p>
      </div>
    </Link>
  );
}
