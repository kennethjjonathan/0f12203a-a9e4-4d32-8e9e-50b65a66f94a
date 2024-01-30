"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

interface PaginationNavProps {
  totalPage: number;
}

const PaginationNav = ({ totalPage }: PaginationNavProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paginationArray = useMemo(() => {
    if (totalPage === undefined) {
      return undefined;
    }
    const sidePage: number = 2;
    const numberOfShownPage = sidePage + 5;

    if (numberOfShownPage >= totalPage) {
      const returnArray: number[] = [];
      for (let i = 1; i <= totalPage; i++) {
        returnArray.push(i);
      }
      return returnArray;
    }

    const leftSiblingIndex: number = Math.max(currentPage - sidePage, 1);
    const rightSiblingIndex: number = Math.min(
      currentPage + sidePage,
      totalPage
    );

    const isLeftDotsShown: boolean = leftSiblingIndex > 2;
    const isRightDotsShown: boolean = rightSiblingIndex < totalPage - 2;

    if (!isLeftDotsShown && isRightDotsShown) {
      const leftItem = 1 + 2 * sidePage;
      const leftTemp: number[] = [];
      for (let i = 1; i <= leftItem; i++) {
        leftTemp.push(i);
      }
      return [...leftTemp, "...", totalPage];
    }

    if (isLeftDotsShown && !isRightDotsShown) {
      const rightItem = 1 + 2 * sidePage;
      const rightTemp: number[] = [];
      for (let i = totalPage - rightItem + 1; i <= totalPage; i++) {
        rightTemp.push(i);
      }
      return [1, "...", ...rightTemp];
    }

    if (isLeftDotsShown && isRightDotsShown) {
      const middleTemp: number[] = [];
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        middleTemp.push(i);
      }
      return [1, "...", ...middleTemp, "...", totalPage];
    }
  }, [totalPage, currentPage]);

  function handleClickPrev() {
    const params = new URLSearchParams(searchParams);
    params.set("page", (currentPage - 1).toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleClickNext() {
    const params = new URLSearchParams(searchParams);
    params.set("page", (currentPage + 1).toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleSetToCertainPage(number: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", number.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  function setInitialState() {
    const page: string | null = searchParams.get("page");
    if (typeof page === "string") setCurrentPage(parseInt(page));
  }

  useEffect(() => {
    setInitialState();
  }, [searchParams]);

  if (totalPage < 2) {
    return null;
  }

  return (
    <div
      aria-label="pagination buttons"
      className="mx-auto flex w-full justify-center items-center gap-1"
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        aria-label="Go to previous page"
        disabled={currentPage === 1}
        onClick={handleClickPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {paginationArray?.map((number, index) =>
        typeof number === "string" ? (
          <span key={index} aria-hidden className="text-primary">
            {number}
            <span className="sr-only">More pages</span>
          </span>
        ) : (
          <Button
            aria-current={number === currentPage ? "page" : undefined}
            key={index}
            onClick={() => handleSetToCertainPage(number)}
            size={"icon"}
            variant={number === currentPage ? "outline" : "ghost"}
          >
            {number}
          </Button>
        )
      )}
      <Button
        variant={"ghost"}
        size={"icon"}
        aria-label="Go to next page"
        disabled={currentPage === totalPage}
        onClick={handleClickNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaginationNav;
