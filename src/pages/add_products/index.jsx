import ProductCard from "@/components/ui/ProductCard";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddProducts = () => {
  const params = useSearchParams();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [barcode, setBarcode] = useState("");
  const [price, setPrice] = useState(0);
  const [base64, setBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();

  const mode = params.get("mode");

  function validateImg(e) {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];

    toBase64(file)
      .then((res) => setBase64(res))
      .catch((err) => console.log(err));
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(error);
    });
  }

  function stateClearing() {
    setName("");
    setBarcode("");
    setBase64("");
    setBrand("");
    setPrice(0);
  }
  async function handleAdd(event) {
    event.preventDefault();
    const body = {
      base64,
      barcode,
      name,
      brand,
      price,
    };
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      setLoading(false);
      stateClearing();
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  }

  useEffect(() => {
    if (mode !== "edit") return;
    async function handleFetchProduct() {
      setLoading(true);
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_ENDPOINT
          }/api/specificProduct?id=${params.get("id")}`
        );
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        setName(data.products[0]?.name);
        setBarcode(data.products[0]?.barcode);
        setBase64(data.products[0]?.picture);
        setBrand(data.products[0]?.brand);
        setPrice(data.products[0]?.price);
      } catch (error) {
        setLoading(false);
        console.warn(error);
      }
    }

    handleFetchProduct();
  }, []);

  async function handleUpdate(event) {
    event.preventDefault();
    const body = {
      base64,
      id: params.get("id"),
      name,
      brand,
      price,
      barcode,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/api/products`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  }

  return (
    <>
      <Head>
        <title>Add Product</title>
      </Head>
      <main className="grid grid-flow-row md:grid-cols-2 px-4 h-[calc(100dvh-54px)] md:h-[calc(100dvh-56px)]">
        <section className="bg-transparent  md:bg-white h-full relative">
          <div className="w-fit mx-auto flex flex-col justify-center h-full py-10 md:py-0">
            <p className="text-2xl font-semibold text-center mx-auto text-black">
              PREViEW
            </p>
            <ProductCard>
              <ProductCard.Img
                src={base64.toString() || "/no_image.png"}
                alt={"Picture of " + brand + " " + name}
              />
              <ProductCard.ColsContainer>
                <ProductCard.ID>{barcode}</ProductCard.ID>
                <ProductCard.Name>{name}</ProductCard.Name>
                <ProductCard.RowsContainer>
                  <ProductCard.Brand>{brand}</ProductCard.Brand>
                  <ProductCard.Price>{price}</ProductCard.Price>
                </ProductCard.RowsContainer>
              </ProductCard.ColsContainer>
            </ProductCard>
          </div>
        </section>
        <section className=" h-full flex flex-col md:justify-center">
          <form
            className="flex flex-col gap-4 w-full md:w-96 mx-auto pb-10"
            onSubmit={!mode ? handleAdd : handleUpdate}
          >
            <label
              htmlFor="picture"
              className="cursor-pointer p-4 bg-red-500 text-white text-center border"
            >
              Select Picture
            </label>
            <input
              onChange={validateImg}
              className="hidden"
              id="picture"
              name="picture"
              type="file"
            />
            <input
              value={barcode}
              className="p-4 border"
              type="text"
              name="barcode"
              id="barcode"
              placeholder="Enter Barcode ID"
              onChange={(event) => setBarcode(event.target.value)}
              required
              disabled={loading}
            />
            <input
              value={name}
              className="p-4 border"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              onChange={(event) => setName(event.target.value)}
              required
              disabled={loading}
            />
            <input
              value={brand}
              className="p-4 border"
              type="text"
              name="brand"
              id="brand"
              placeholder="Enter Brand"
              onChange={(event) => setBrand(event.target.value)}
              required
              disabled={loading}
            />
            <input
              value={price}
              className="p-4 border"
              type="number"
              name="price"
              id="price"
              placeholder="Enter Price"
              onChange={(event) => setPrice(event.target.value)}
              required
              disabled={loading}
            />
            <button
              disabled={loading}
              className="p-4 border bg-red-500 text-white"
            >
              {loading ? "Processing..." : mode ? "Update" : "Add"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default AddProducts;
