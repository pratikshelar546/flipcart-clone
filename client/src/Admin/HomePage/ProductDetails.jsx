import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { getProductByAdmin } from "../../redux/reducers/Products/productAction";
import ProductCard from "../../componends/Product/ProductCard";
const ProductDetails = () => {
  const { _id } = JSON.parse(localStorage.getItem("AdminDetail"));
  // console.log(_id);
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getProductByAdmin(_id))
      .then((data) => setProduct(data.payload))
      .then(() =>
        setTimeout(() => {
          setLoading(false);
        }, 1500)
      );
  }, [dispatch, _id]);

  return (
    <>
      <main className="w-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-medium uppercase">Product Details</h1>
        <section className="w-full max-w-6xl bg-white p-5 flex flex-col items-center justify-center">
          {loading ? (
          <>
          <div className="w-full h-full flex justify-center ">
            <iframe
              src="https://lottie.host/?file=adbf2be0-5e20-479c-ac8b-63afb952b7a7/KmWdrrTqCZ.json"
              title="loading"
            ></iframe>
          </div>
        </>
          ) : (
            <>
              {product &&
                product.map((product) => (
                  <ProductCard
                    {...product}
                    key={product._id}
                    refData={"edit"}
                    path={"admin"}
                  />
                ))}
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default ProductDetails;
