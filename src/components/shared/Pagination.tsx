import { useData } from "@/providers/DataProvider";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const Pagination = () => {
  const {
    page,
    totalPages,
    handleNext,
    handlePrev,
    goToLastPage,
    goToFirstPage,
  }: any = useData();
  console.log("Current Page", page);
  console.log("Total Pages", totalPages);
  return (
    <div className="flex items-center space-x-6 lg:space-x-8">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        {/* Go to first page */}
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={goToFirstPage}
          disabled={Number(page) === 1}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handlePrev}
          disabled={Number(page) === 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handleNext}
          disabled={Number(page) === totalPages || totalPages === 1}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={goToLastPage}
          disabled={Number(page) === totalPages || totalPages === 1}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
