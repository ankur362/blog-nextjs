export const dynamic = 'force-dynamic';
import { fetchPosts } from '@/app/lib/db';
import BlogPostCard from '../components/BlogPostCard';
import Pagination from '../components/Pagination';

export default async function Posts({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { posts, total } = await fetchPosts(page);

  return (
    <div className="container mx-auto">
      {posts.map(post => (
        <BlogPostCard key={post.id} post={post} />
      ))}
      <Pagination currentPage={page} totalPosts={total} postsPerPage={5} />
    </div>
  );
}