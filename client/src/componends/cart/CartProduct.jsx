import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../../redux/reducers/Products/productAction";
import { NumericFormat } from "react-number-format";
import { addCart } from "../../redux/reducers/cart/cartAction";

const CartProduct = ({ product }) => {
  const [products, setProducts] = useState();
  // console.log(product);
  const dispatch = useDispatch();
  //    console.log(product.details);
  const id = product.details;
  useEffect(() => {
    dispatch(getProductById(id)).then((data) => {
      setProducts(data?.payload);
    });
  }, [dispatch, id]);
  //   console.log(products);

  let [quantity, setQuantity] = useState(product.quantity);
  const details = id;
  const increment = () => {
    
    setQuantity(Number(quantity) + 1);
  
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    
    }
  };
  useEffect(() => {
    dispatch(addCart(details, quantity));
  }, [details, dispatch, quantity]);
  return (
    <>
      <main className="w-full h-full">
        <div className="flex flex-row gap-2">
          <section className="flex w-28 h-28">
            <img
              src={products?.image[0]}
              alt={products?.title}
              className="w-full h-full"
            />
          </section>
          <section className=" w-4/5 flex flex-col">
            <div>
              <h1>{products?.title}</h1>
            </div>
            <div className="text-gray-500 text-sm">
              {products?.description?.slice(0, 40)}
            </div>
            <div className="flex gap-2">
              {products?.offerPrice ? (
                <>
                  <NumericFormat
                    className="text-xl top-1 relative font-semibold"
                    value={products?.offerPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                  <NumericFormat
                    className=" top-2 relative line-through text-gray-500"
                    value={products?.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                  <h1 className="top-2 relative text-blue-600">
                    {" "}
                    {(
                      ((products?.price - products?.offerPrice) * 100) /
                      products?.offerPrice
                    ).toFixed(2)}
                    % off
                  </h1>
                </>
              ) : (
                <NumericFormat
                  className="twxt-xl font-semibold"
                  value={products?.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
              )}
            </div>
          </section>
        </div>
        <div className="flex p-3 gap-4 text-lg">
          <div className="flex items-center">
            <button
              className="w-8 h-8 rounded-full pt-1  border-2  text-lg"
              onClick={decrement}
            >
              -
            </button>
            <h1 className=" inline-block h-8 w-10 rounded-sm border-2  pt-1 pb-2 text-center mx-1">
              {quantity}
            </h1>
            <button
              className="w-8 h-8 rounded-full pt-1 inline-block border-2  text-lg"
              onClick={increment}
            >
              +
            </button>
          </div>
          <h1 className=" cursor-pointer font-semibold hover:text-blue-600">
            Save for later
          </h1>
          <h1 className=" cursor-pointer font-semibold hover:text-blue-600">
            Remove
          </h1>
        </div>
      </main>
    </>
  );
};

export default CartProduct;
