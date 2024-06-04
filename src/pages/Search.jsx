import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React from "react";

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

export default function Search() {
  const [query, setQuery] = React.useState("");

  const { isLoading, data: searchResults } = useQuery({
    queryKey: ["search", { query }],
    queryFn: () =>
      fetch(
        ` https://ecom-catalog-system-we9s7.ondigitalocean.app/products-search?searchQuery=${query}`
      ).then((res) => res.json()),
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between w-full">
        <Link to="/" className="text-lg font-bold">
          Home{" "}
        </Link>{" "}
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query === "" ? (
        <div> No search results </div>
      ) : isLoading ? (
        <div className="p-10 flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {!searchResults.length && <div>No search results</div>}
          {searchResults.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
