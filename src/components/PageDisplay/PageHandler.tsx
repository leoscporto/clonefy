"use client";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
  currentPage: number;
  onNext: () => void;
  onPrev: () => void;
}

const PageNavigation: React.FC<Props> = ({ currentPage, onNext, onPrev }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onPrev}
        className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
      >
        <FaAngleLeft />
      </button>
      <span className="text-lg font-medium">{currentPage}</span>
      <button
        onClick={onNext}
        className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

interface PageDisplayProps {
  currentPage: number;
  totalNumberOfPages: number;
}

const PageDisplay: React.FC<PageDisplayProps> = ({
  currentPage,
  totalNumberOfPages,
}) => {
  return (
    <div className="flex items-center">
      <span className="text-gray-600">Exibindo {currentPage} de</span>
      <span className="text-gray-800 font-medium ml-1">
        {totalNumberOfPages} {totalNumberOfPages > 1 ? "páginas" : "página"}
      </span>
    </div>
  );
};

interface PageHandlerProps {
  totalNumberPages: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
}

const PageHandler: React.FC<PageHandlerProps> = ({
  currentPage,
  totalNumberPages,
  onPageChanged,
}) => {
  const [page, setCurrentPage] = useState(currentPage);

  const handleNext = () => {
    if (currentPage < totalNumberPages) {
      let newPage = page + 1;
      setCurrentPage(newPage);
      onPageChanged(newPage);
    }
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      let newPage = page - 1;
      setCurrentPage(newPage);
      onPageChanged(newPage);
    }
  };

  return (
    <div className="bg-white flex justify-between items-center py-4 px-8">
      <PageDisplay currentPage={page} totalNumberOfPages={totalNumberPages} />
      <PageNavigation
        currentPage={page}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default PageHandler;
