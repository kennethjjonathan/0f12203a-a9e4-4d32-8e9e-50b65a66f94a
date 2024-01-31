"use client";

import PaginationNav from "@/components/PaginationNav/PaginationNav";
import ProductsTable from "@/components/ProductsTable/ProductsTable";
import TableSkeleton from "@/components/Skeletons/TableSkeleton/TableSkeleton";
import CONSTANTS from "@/constants";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const PRODUCTPERPAGE: number = 10;

export default function Home() {
  const searchParams = useSearchParams();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getData = useCallback(async () => {
    const page: string | null = searchParams.get("page");
    setIsLoading(true);
    try {
      const data = await axios(`${CONSTANTS.DATA_URL}/products`, {
        params: {
          limit: PRODUCTPERPAGE,
          skip: page ? PRODUCTPERPAGE * parseInt(page) - PRODUCTPERPAGE : 0,
        },
      });
      setProducts(data.data.products);
      setTotalPage(data.data.total / PRODUCTPERPAGE);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <main className="container flex flex-col justify-center items-center gap-2 min-h-screen">
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="w-full">
            <p className="text-2xl font-bold w-full text-left">
              Welcome back admin!
            </p>
            <p className="text-muted-foreground textlg w-full text-left">
              Here&apos;s the list of the products
            </p>
          </div>
          <div className="w-full">
            {products && <ProductsTable products={products} />}
          </div>
        </>
      )}
      <div className="w-full">
        <PaginationNav totalPage={totalPage} />
      </div>
    </main>
  );
}
