import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Pagination from "../components/Pagination";

function Product({ product }) {
  return (
    <Link
      key={product._id}
      className="flex flex-col overflow-hidden rounded shadow group"
      to={`/products/${product._id}`}
    >
      <img
        className="object-cover h-72 group-hover:scale-105 transition-all"
        src={product.images[0]}
        alt={product.title}
      />
      <div className="p-4 gap-4 flex justify-between items-center">
        <p className="text-xl font-bold">{product.name}</p>
        <div className="flex flex-row items-end">
          <p className="leading-4 text-xl font-semibold"> {product.price}</p>
          <p className="text-xs ml-1 leading-3">USD</p>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [page, setPage] = React.useState(1);

  const { isLoading, data: products } = useQuery({
    queryKey: ["products", { page }],
    queryFn: () =>
      fetch(
        `https://ecom-catalog-system-we9s7.ondigitalocean.app/products?pageNumber=${page}&pageSize=10`
      ).then((res) => res.json()),
  });

  return isLoading ? (
    <div className="p-10 flex justify-center items-center">
      <p>Loading...</p>
    </div>
  ) : (
    <div className="flex flex-col p-4 h-screen justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <p className="text-lg font-bold">E-Commerce Catalog System</p>
          <Link to="/search" className="text-lg font-bold">
            Search
          </Link>
          <Link to="/create" className="text-lg font-bold">
            Create Product
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {products.products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="self-center py-10">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={products.totalPages}
        />
      </div>
    </div>
  );
}
