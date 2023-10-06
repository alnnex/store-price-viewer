import { UserState } from "@/context/userContext";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ProductCard = ({ children }) => {
  return (
    <div className="relative flex flex-col w-full min-w-fit md:w-96 bg-black/10 rounded-md overflow-hidden shadow-xl shadow-black/40 group">
      {children}
    </div>
  );
};

ProductCard.Img = Img;
ProductCard.DeleteEditBtn = DeleteEditBtn;
ProductCard.ID = ID;
ProductCard.ColsContainer = ColsContainer;
ProductCard.RowsContainer = RowsContainer;
ProductCard.Name = Name;
ProductCard.Brand = Brand;
ProductCard.Price = Price;

export default ProductCard;

function Img({ ...restProps }) {
  return (
    <Image
      width={400}
      height={400}
      className="w-80 p-4 my-auto h-auto object-contain object-center mx-auto"
      {...restProps}
    />
  );
}

function DeleteEditBtn({ product, setProducts, products, setLoading }) {
  const { user } = UserState();
  const [show, setShow] = useState(false);

  const router = useRouter();

  async function handleDelete(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/products`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: product.ID }),
        }
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }

    setShow(false);
    setProducts(products.filter((filtered) => filtered.ID !== product.ID));
  }

  function handleEditBtn() {
    router.push(`/add_products?mode=edit&id=${product.ID}`);
  }

  return (
    <>
      <div
        className={`absolute inset-0 bg-black/70 z-50 p-3 flex flex-col justify-center ${
          show ? "block" : "hidden"
        }`}
      >
        <span className="text-white w-40 mx-auto">
          <h1>Are you sure you want to delete this product?</h1>
          <span className="flex gap-3 mt-2 w-full justify-center">
            <button
              onClick={handleDelete}
              className=" p-2 md:p-2 w-20 bg-red-600 text-sm md:text-base active:scale-90"
            >
              Yes
            </button>
            <button
              onClick={() => setShow(false)}
              className=" p-2 md:p-2 w-20  border border-red-500 text-sm md:text-base active:scale-90"
            >
              Cancel
            </button>
          </span>
        </span>
      </div>
      {user && (
        <span className="flex text-white absolute top-2 right-2 justify-center gap-2 mb-2  translate-x-96 opacity-0 group-hover:opacity-100 group-hover:translate-x-0  transition-all duration-700">
          <button
            onClick={handleEditBtn}
            className="p-2 md:p-2 w-16 bg-orange-400 text-sm md:text-base"
          >
            Edit
          </button>
          <button
            onClick={() => setShow(true)}
            className=" p-2 md:p-2 w-16 bg-red-600 text-sm md:text-base"
          >
            Delete
          </button>
        </span>
      )}
    </>
  );
}

function ColsContainer({ children }) {
  return (
    <div className="bg-black/60 mt-auto w-full bottom-0 left-0 text-white p-3 flex flex-col overflow-hidden">
      {children}
    </div>
  );
}

function ID({ children }) {
  return <small className="text-red-500 tracking-widest">{children}</small>;
}

function RowsContainer({ children }) {
  return <div className="flex justify-between">{children}</div>;
}

function Name({ children }) {
  return (
    <div className="text-xl md:text-2xl font-semibold h-16 line-clamp-2">
      {children}
    </div>
  );
}

function Brand({ children }) {
  return (
    <div className="text-red-500 font-semibold tracking-wider">{children}</div>
  );
}

function Price({ children }) {
  return <div>&#8369;{children}</div>;
}
