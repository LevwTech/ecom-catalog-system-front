import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const { isLoading, data } = useQuery({
    queryKey: ["product", { id }],
    queryFn: () =>
      fetch(
        ` https://ecom-catalog-system-we9s7.ondigitalocean.app/products/${id}`
      ).then((res) => res.json()),
  });

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageNumber, setImageNumber] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
    }
  }, [isLoading]);

  const updateProduct = () => {
    setLoading(true);
    fetch(
      ` https://ecom-catalog-system-we9s7.ondigitalocean.app/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          description,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        alert("Product updated successfully");
        window.location.reload();
        setLoading(false);
      } else {
        alert("Failed to update product");
      }
    });
  };

  const deleteProduct = () => {
    setLoading(true);
    fetch(
      ` https://ecom-catalog-system-we9s7.ondigitalocean.app/products/${id}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        alert("Product deleted successfully");
        navigate("/");
        setLoading(false);
      } else {
        alert("Failed to delete product");
      }
    });
  };

  return (
    <div className="flex flex-col lg:w-max-[1184px] lg:w-[1184px] lg:m-auto min-h-screen bg-white">
      <Link to="/" className="text-lg font-bold text-black p-4">
        Home
      </Link>
      <div className="flex flex-col lg:flex-row bg-white mt-[72px] lg:shadow lg:rounded lg:mt-3 lg:p-4 relative">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="absolute top-4 right-4 flex gap-4 items-center">
              <span className="cursor-pointer" onClick={() => setEdit(!edit)}>
                <RiEdit2Line size={25} />
              </span>
              <BiTrash
                size={25}
                className="cursor-pointer"
                onClick={deleteProduct}
              />
            </div>
            <div className="flex flex-col gap-4 lg:w-[50%]">
              <img
                src={data.images[imageNumber]}
                className="rounded w-full h-[400px] object-cover"
              />
              <div className="flex gap-4 grid-cols-3 desktop:grid-cols-4 w-[358px] desktop:w-full">
                {data.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-[120px] h-[120px] cursor-pointer"
                  >
                    <img
                      onClick={() => setImageNumber(index)}
                      src={image}
                      className="rounded w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col lg:w-[50%]">
              <p className="flex text-lg font-normal leading-6 tracking-[-0.8px] px-4 py-1">
                {edit ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  data.name
                )}
              </p>
              <p className="text-[2rem] font-bold leading-10 tracking-[-2px] text-[#0e001a] p-4">
                {edit ? (
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                ) : (
                  data.price
                )}
                <span className="text-sm font-semibold leading-5 tracking-[0] text-[#0e001a] pl-1">
                  USD
                </span>
              </p>
              <div className="flex flex-col p-4 my-2 gap-4">
                <div className="flex flex-row justify-between w-full text-lg font-semibold leading-6 tracking-[-1px] items-center">
                  Product overview
                </div>
                {edit ? (
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-[100px] p-4 rounded-lg"
                  />
                ) : (
                  data.description
                )}
                {edit && (
                  <button
                    onClick={updateProduct}
                    className="py-2 bg-black text-white rounded-md"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default ProductScreen;
