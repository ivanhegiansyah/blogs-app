import { useEffect } from 'react';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

export type PaginationType = {
  totalRecords?: number;
  pageLimit?: number;
  pageNeighbours?: number;
  onPageChanged?: any;
  isReset?: boolean;
  currentPage?: number;
};

const range = (from: any, to: any, step: any = 1) => {
  let i = from;
  const rangeData = [];

  while (i <= to) {
    rangeData.push(i);
    i += step;
  }

  return rangeData;
};

const Pagination = ({
  totalRecords = 0,
  pageLimit = 30,
  pageNeighbours = 1,
  onPageChanged = (f: any) => f,
  isReset = false,
  currentPage = 1,
}: PaginationType) => {
  const totalPages = Math.ceil(totalRecords / pageLimit);

  const gotoPage = (page: any) => {
    let currPage = Math.max(0, Math.min(page, totalPages));

    if (page < 1) {
      currPage = 1;
    }

    const paginationData = {
      currentPage: currPage,
      totalPages: totalPages,
      pageLimit: pageLimit,
      totalRecords: totalRecords,
    };

    onPageChanged(paginationData);
  };

  useEffect(() => {
    isReset && gotoPage(1);
  }, []);

  const handleClick = (page: any, evt: any) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt: any) => {
    evt.preventDefault();
    gotoPage(currentPage - 1);
  };

  const handleMoveRight = (evt: any) => {
    evt.preventDefault();
    gotoPage(currentPage + 1);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - 3;
      const rightBound = currentPage + 3;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  const pages = fetchPageNumbers();

  if (pages.length === 0) {
    return (
      <div className="flex items-center h-[24px] text-sm text-gray-300 font-ubuntu">
        Loading...
      </div>
    );
  } else if (currentPage) {
    return (
      <>
        <div className="w-fit border rounded-lg overflow-hidden divide-x flex justify-between md:hidden font-ubuntu">
          <div
            className="cursor-pointer"
            onClick={(event: any) => currentPage !== 1 && handleMoveLeft(event)}
          >
            <div className="py-2 px-4 text-black font-medium">
              <span className="">Previous</span>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={(event: any) =>
              totalPages !== currentPage && handleMoveRight(event)
            }
          >
            <div className="py-2 px-4 text-black font-medium">
              <span className="">Next</span>
            </div>
          </div>
        </div>

        <div className="w-fit items-center overflow-hidden hidden space-x-2 md:flex font-ubuntu">
          <div
            className={`px-2 flex items-center justify-center rounded ${
              currentPage !== 1 ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
            onClick={(event: any) => currentPage !== 1 && handleMoveLeft(event)}
          >
            <div className={`${currentPage === 1 ? 'flex rounded-full' : ''}`}>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </div>
          </div>

          {pages.map((page, index) => {
            if (page === LEFT_PAGE) {
              return (
                <div className="cursor-default" key={`left_page-${index}`}>
                  <div className="px-2 text-black">
                    <span>...</span>
                  </div>
                </div>
              );
            }

            if (page === RIGHT_PAGE) {
              return (
                <div className="cursor-default" key={`right_page-${index}`}>
                  <div className="px-2 text-black">
                    <span>...</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={`pagination_page-${index}`}
                onClick={(e) => handleClick(page, e)}
                className={'cursor-pointer'}
              >
                <div
                  className={`px-2 text-black rounded ${
                    currentPage === page
                      ? `text-white bg-slate-400 hover:bg-slate-20`
                      : 'hover:bg-slate-200'
                  }`}
                >
                  {page}
                </div>
              </div>
            );
          })}

          <div
            className={`px-2 flex items-center justify-center rounded ${
              totalPages !== currentPage
                ? 'cursor-pointer'
                : 'cursor-not-allowed'
            }`}
            onClick={(event: any) =>
              totalPages !== currentPage && handleMoveRight(event)
            }
          >
            <div>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Pagination;
