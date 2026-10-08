import Link from 'next/link';

type PaginationProps = {
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  search?: string;
};

function pageHref(page: number, search?: string) {
  const params = new URLSearchParams({ page: String(page) });
  if (search) params.set('search', search);
  return `/?${params.toString()}`;
}

export default function Pagination({ currentPage, totalPosts, postsPerPage, search }: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {currentPage > 1 && (
        <Link 
          href={pageHref(currentPage - 1, search)} 
          className="px-4 py-2 border"
        >
          Previous
        </Link>
      )}
      {currentPage < totalPages && (
        <Link 
          href={pageHref(currentPage + 1, search)} 
          className="px-4 py-2 border"
        >
          Next
        </Link>
      )}
    </div>
  );
}
