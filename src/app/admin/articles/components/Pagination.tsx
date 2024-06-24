import Link from 'next/link'
import React from 'react'

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex space-x-2">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`}>
          <button className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded">
            ＜
          </button>
        </Link>
      )}
      {pageNumbers.map((number) => (
        <Link key={number} href={`?page=${number}`}>
          <button className={`px-3 py-1 ${currentPage === number ? 'bg-indigo-500 text-white' : 'bg-gray-300 hover:bg-gray-400'} rounded`}>
            {number}
          </button>
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`}>
          <button className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded">
            ＞
          </button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
