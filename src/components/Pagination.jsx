import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex flex-row items-center">
      <button
        disabled={page === 1}
        className={`flex items-center justify-center h-10 lg:w-8 ${
          page === 1 && "cursor-not-allowed"
        }`}
        onClick={() => setPage(page - 1)}
      >
        <span className={`${page === 1 && "text-gray-500"}`}>
          {" "}
          <FiChevronLeft size={20} />
        </span>
      </button>
      <div className="flex items-center justify-center h-10 lg:w-20">
        {page} of {totalPages}
      </div>
      <button
        disabled={page === totalPages}
        className={`flex items-center justify-center h-10 lg:w-8 ${
          page === totalPages && "cursor-not-allowed"
        }`}
        onClick={() => setPage(page + 1)}
      >
        <span className={`${page === totalPages && "text-gray-500"}`}>
          {" "}
          <FiChevronRight size={20} />
        </span>
      </button>
    </div>
  );
}

export default Pagination;
