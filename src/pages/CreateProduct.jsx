import { Link } from "react-router-dom";

function CreateProducts() {
  return (
    <main className={`flex flex-col`}>
      <section className="flex bg-white px-[36px] py-[26px] font-bold  justify-between items-center text-4xl gap-2 ">
        Create Products
        <Link to="/" className="text-lg font-bold">
          Home{" "}
        </Link>
      </section>

      <form
        action={"https://ecom-catalog-system-we9s7.ondigitalocean.app/products"}
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-4 px-[36px]"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="Name" className="">
            Name
          </label>
          <input
            className="px-4 py-3 rounded"
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="Price" className="">
            Price
          </label>
          <input
            className="px-4 py-3 rounded"
            type="number"
            name="price"
            id="price"
            min={0}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="Name" className="">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="px-4 py-3 rounded h-28 max-h-48 resize-none"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="Stock count" className="">
            Images
          </label>
          <input id="images" required type="file" multiple name="images" />
        </div>
        <button className="py-2 bg-black text-white rounded-md">Submit</button>
      </form>
    </main>
  );
}

export default CreateProducts;
