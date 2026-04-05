import React from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

const Pagination = React.memo(({ currentPage, totalPages, onPageChange }) => {
    if (totalPages == 0) return null;
    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
            >
                <IoChevronBack size={18} />
            </button>

            <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
            >
                <IoChevronForward size={18} />
            </button>
        </div>
    )
})

export default Pagination