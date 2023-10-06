import Modal from "@/components/Modal";
import ProductCard from "@/components/ui/ProductCard";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const params = useSearchParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = params.get("search");

  useEffect(() => {
    const data = async () => {
      setLoading(true);
      let endpoint = "";
      if (search) {
        endpoint = `specificProduct?id=${search}`;
      } else {
        endpoint = "products";
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${endpoint}`
        );
        var data = await response.json();
        setProducts(data.products);
        console.log(data.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    data();
  }, [search]);

  return (
    <>
      <Head>
        <title>Price Viewer</title>
        <meta
          property="og:title"
          content="My store/shop product viewer"
          key="products"
        />
      </Head>
      <main>
        <section className="bg-[url('/landing.jpg')] h-40 sm:h-[calc(4px*60)] md:h-[calc(4px*90)] bg-cover bg-center bg-no-repeat relative">
          <div className="bg-black/30 absolute inset-0" />
          <h1 className="text-white absolute w-full text-4xl md:text-8xl font-medium text-center top-1/2 -translate-y-1/2 tracking-wider z-10">
            PRODUCT ViEWER
          </h1>
        </section>
        <section
          className={`grid  gap-3 py-10 w-fit mx-auto px-2 ${
            products?.length === 1
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {loading ? (
            <>Loading</>
          ) : (
            products &&
            products
              // .filter((filter) => {
              //   if (search)
              //     return (
              //       filter.barcode === search ||
              //       filter.name.toLowerCase().includes(search.toLowerCase()) ||
              //       filter.brand.toLowerCase().includes(search.toLowerCase())
              //     );
              //   else {
              //     return filter.id !== search;
              //   }
              // })
              .map((product) => (
                <ProductCard key={product.ID}>
                  <ProductCard.DeleteEditBtn
                    setProducts={setProducts}
                    products={products}
                    product={product}
                    setLoading={setLoading}
                  />
                  <ProductCard.Img
                    src={product.picture}
                    alt={"Picture of" + product.brand + product.name}
                  />
                  <ProductCard.ColsContainer>
                    <ProductCard.ID>{product.barcode}</ProductCard.ID>
                    <ProductCard.Name>{product.name}</ProductCard.Name>
                    <ProductCard.RowsContainer>
                      <ProductCard.Brand>{product.brand}</ProductCard.Brand>
                      <ProductCard.Price>{product.price}</ProductCard.Price>
                    </ProductCard.RowsContainer>
                  </ProductCard.ColsContainer>
                </ProductCard>
              ))
          )}
        </section>
      </main>
    </>
  );
}
