import React from "react";

type PaginationProps = {
  currentPage: number;
  perPage: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
};

export default function Pagination({ currentPage, perPage, totalItems, handlePageChange }: PaginationProps) {
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
     <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        ＜
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`${currentPage === number ? "px-2 bg-indigo-500 text-white rounded-full" : ""}`}
        >
          {number}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        ＞
      </button>
   </div>
  );
};
