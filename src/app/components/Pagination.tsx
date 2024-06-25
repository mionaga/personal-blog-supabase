import React from "react";
import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  perPage: number;
  totalItems: number;
};

export default function Pagination({ currentPage, perPage, totalItems }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / perPage);
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - 4;
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
   <div className="flex justify-around gap-2 px-2">
    <Link href={`?page=${currentPage - 1}`}>
      <button className="">＜</button>
    </Link>
    {pageNumbers.map((number) => (
        <Link key={number} href={`?page=${number}`}>
          <button className={`${currentPage === number ? "px-2 bg-indigo-500 text-white rounded-full" : ""}`}>
            {number}
          </button>
        </Link>
      ))}
    <Link href={`?page=${currentPage + 1 }`}>
      <button className="">＞</button>
    </Link>
   </div>
  );
};
