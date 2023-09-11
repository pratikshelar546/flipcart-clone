import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../../redux/reducers/Products/productAction";
import { NumericFormat } from "react-number-format";
import { addCart, deleteProduct } from "../../redux/reducers/cart/cartAction";
import { useParams } from "react-router";
import { toast } from "react-toastify";
const CartProduct = ({ product }) => {
  const [products, setProducts] = useState();
  // console.log(product);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
    //  console.log(products);
  const productId = product.details;

  useEffect(() => {
    dispatch(getProductById(productId)).then((data) => {
      setProducts(data?.payload);
    });
  }, [dispatch, productId]);
  //   console.log(products);

  let [quantity, setQuantity] = useState(product.quantity);
  const details = productId;
  const increment = () => {
    console.log(products.quantity);
    if(products.quantity <=quantity){
      // console.log(quantity);
      toast.error("insuffecinat Quantity" , {
        position:"bottom-center"
      })
      setQuantity(Number(quantity))
    }else{
      setQuantity(Number(quantity) + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    dispatch(addCart(details, quantity));
  }, [details, dispatch, quantity]);
  // console.log(details);
  // const user =JSON.parse(localStorage.getItem('newUser'));
  const deleteProducts = () => {
    dispatch(deleteProduct(id, productId));
    //  console.log(data);
    window.location.reload();
  };

  // useEffect(()=>{
  //   if(products !== null){

  //     console.log("fetching");
  //     onProductUpdate(products)
  //   }
  // },[products,onProductUpdate])
  return (
    <>
      <main className="w-full h-full">
        <div className="flex flex-row gap-2">
          <section className="flex w-28 h-28">
            <img
              src={products?.image[0].url}
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

          <button
            onClick={deleteProducts}
            className=" active:text-red-700 cursor-pointer font-semibold hover:text-blue-600"
          >
            Remove
          </button>
        </div>
      </main>
    </>
  );
};

export default CartProduct;
