import ChevronLeftIcon from "./ChevronLeftIcon";
import ChevronRightIcon from "./ChevronRightIcon";

interface Pagination {
  currPage: number;
  totalPage: number;
  onClickPrevButton: Function;
  onClickNextButton: Function;
}

const Pagination = ({
  currPage,
  totalPage,
  onClickPrevButton,
  onClickNextButton,
}: Pagination) => {
  const isPrevButtonDisable = currPage === 1;
  const isNextButtonDisable = currPage === totalPage;
  const commonStyle =
    "flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800";

  return (
    <div className='flex gap-4 items-center'>
      <button
        disabled={isPrevButtonDisable}
        className={`${commonStyle} rounded-s hover:bg-gray-900 ${
          isPrevButtonDisable && "cursor-not-allowed"
        }`}
        onClick={() => {
          if (isPrevButtonDisable) return;
          onClickPrevButton();
        }}
        data-testid='prev'
      >
        <ChevronLeftIcon />
      </button>

      <span className='text-sm text-gray-700 dark:text-gray-400'>
        Page{" "}
        <span className='font-semibold text-gray-900 dark:text-white'>
          {currPage}
        </span>{" "}
        /{" "}
        <span className='font-semibold text-gray-900 dark:text-white'>
          {totalPage}
        </span>
      </span>

      <button
        disabled={isNextButtonDisable}
        className={`${commonStyle} border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 ${
          isNextButtonDisable && "cursor-not-allowed"
        }`}
        onClick={() => {
          if (isNextButtonDisable) return;
          onClickNextButton();
        }}
        data-testid='next'
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
