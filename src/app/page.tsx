"use client";

import ProductsTable from "@/components/ProductsTable/ProductsTable";
import CONSTANTS from "@/constants";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await axios(
        `${CONSTANTS.DATA_URL}/products?limit=10&skip=10`
      );
      setProducts(data.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <main className="container flex flex-col justify-center items-center min-h-screen gap-2">
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
    </main>
  );
}
