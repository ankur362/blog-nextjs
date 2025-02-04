export const dynamic = 'force-dynamic';
import { fetchPosts } from '@/app/lib/db';
import SearchBar from '@/app/components/SearchBar';
import BlogPostCard from '@/app/components/BlogPostCard';
import Pagination from '@/app/components/Pagination';

export default async function Home({ searchParams }) {
  const searchParamsAwaited = await searchParams;
  const search = searchParamsAwaited?.search || '';
  const page = Number(searchParamsAwaited?.page) || 1;
  const limit = 5;

  // Fetch posts with search filtering
  const { posts, total } = await fetchPosts(page, limit, search);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      
      <div className="mb-8">
        <SearchBar />
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No posts found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} className="h-full" />
          ))}
        </div>
      )}

      <div className="mt-8">
        <Pagination 
          currentPage={page}
          totalPosts={total}
          postsPerPage={limit}
          search={search}
        />
      </div>
    </div>
  );
}
