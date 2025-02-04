import Link from 'next/link';

export default function Pagination({ currentPage, totalPosts, postsPerPage }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {currentPage > 1 && (
        <Link 
          href={`/?page=${currentPage - 1}`} 
          className="px-4 py-2 border"
        >
          Previous
        </Link>
      )}
      {currentPage < totalPages && (
        <Link 
          href={`/?page=${currentPage + 1}`} 
          className="px-4 py-2 border"
        >
          Next
        </Link>
      )}
    </div>
  );
}