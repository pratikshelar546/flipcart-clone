import React, { useEffect } from "react";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Checkbox, FormGroup, Slider } from "@mui/material";
import { IoIosArrowUp } from "react-icons/io";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { productByCategory } from "../../redux/reducers/Products/productAction";
import ProductCard from "./ProductCard";
import { categories } from "../../utlis/constrants";
import { toast } from "react-toastify";

import NotFound from "../NotFound";
const Product = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const [hidden, setHidden] = useState(false);
  const [key, setKey] = useState(location.state.key);

  const [category, setCategory] = useState(
    location.state.categorys ? location.state.categorys : ""
  );
  // console.log(category);
  const [selectedBrand, setSelectedBrand] = useState("");

  const [price, setPrice] = useState([0,150000]);
  useEffect(() => {
  
    if (category === "electronics") {
      setPrice([0, 160000]);
    } else {
      setPrice([0, 20000]);
    }
  }, [category]);

  const [laoding, setLoading] = useState(false);
  // console.log(laoding);
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
    // console.log(price[0]);
  };
  const HandleDisplay = () => {
    setHidden(!hidden);
  };
  useEffect(() => {
    setLoading(true);
    try {
      dispatch(productByCategory(category)).then((data) => {
        setProduct(data.payload);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      toast.error("Error occurs", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [category, dispatch]);
  // console.log(product);
  // console.log(product[0].brand.Name);
  const [filterProduct, setFilterProduct] = useState([]);

  useEffect(() => {
    if (Array.isArray(product)) {
      const filteredProducts = product.filter((productss) => {
        // const newPeoduct =
        const productPrice = productss.offerPrice || productss.price;
        return (
          productss.key === key &&
          productPrice >= price[0] &&
          productPrice <= price[1]
        );
      });
      // console.log();
      setFilterProduct(filteredProducts);
    } else {
      // console.log("not found");
      setFilterProduct([]);
    }
  }, [product, key, selectedBrand, price]);
  const [filterByPrice, setFilterByPrice] = useState([]);
  useEffect(() => {
    if (Array.isArray(product)) {
      const FilterPrice = product.filter((productss) => {
        // const newPeoduct =
        const productPrice = productss.offerPrice || productss.price;
        return productPrice >= price[0] && productPrice <= price[1];
      });
      
      setFilterByPrice(FilterPrice);
    } else {
      // console.log("not found");
      setFilterByPrice([]);
    }
  }, [product, selectedBrand, price]);
  // console.log(filterProduct);
  const clearHandler = () => {
    setCategory(location.state.categorys);
    setPrice([0, 60000]);
  };
  // console.log(selectedBrand);
  return (
    <>
      <main className="">
        <div className="flex gap-2">
          <section className="m-2 lg:block hidden w-64 h-full bg-white">
            <div className="p-1 border-b">
              <div className="flex flex-row p-2 justify-between  items-center">
                <h1 className="text-lg">Filters</h1>
                <p
                  className="text-sm text-blue-600 cursor-pointer"
                  onClick={clearHandler}
                >
                  CLEAR ALL
                </p>
              </div>
            </div>
            <div className="p-1 border-b">
              <p className="text-sm">CATEGORIES</p>
              <div className="flex flex-col pb-1">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="category-radio-buttons-group"
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setKey("");
                    }}
                    // onClick={setCategory(category)}
                    name="category-radio-buttons"
                    value={category}
                  >
                    {categories.map((el, i) => (
                      <FormControlLabel
                        key={i}
                        //
                        value={el}
                        control={<Radio size="small" />}
                        label={
                          <span className="text-sm" key={i}>
                            {el}
                          </span>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="p-1 border-b">
              <div className="flex flex-col gap-2  px-1">
                <span className="font-medium text-sm">PRICE</span>
                <div className="px-3 w-full">
                  {category === "electronics" ? (
                    <Slider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      getAriaLabel={() => "Price range slider"}
                      min={0}
                      max={160000}
                    />
                  ) : (
                    <Slider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      getAriaLabel={() => "Price range slider"}
                      min={0}
                      max={20000}
                    />
                  )}
                  {price ? (
                    <div className="flex gap-3 items-center justify-between mb-2 w-full m">
                      <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                        ₹{price[0].toLocaleString()}
                      </span>
                      <span className="font-medium text-gray-400">to</span>
                      <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                        ₹{price[1].toLocaleString()}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="p-1 border-b">
              <div className="flex flex-col">
                <p className="text-sm font-medium flex flex-row justify-between pr-2">
                  Brand
                  <IoIosArrowUp size={"1.2em"} onClick={HandleDisplay} />
                </p>
                <FormGroup className={hidden ? " !hidden" : ""}>
                  {key.length === 0
                    ? filterByPrice
                        .reduce((uniqueBrands, product) => {
                          if (!uniqueBrands.includes(product.brand.Name)) {
                            uniqueBrands.push(product.brand.Name);
                          }
                          return uniqueBrands;
                        }, [])
                        .map((brandName) => (
                          <FormControlLabel
                            key={brandName}
                            control={
                              <Checkbox checked={selectedBrand === brandName} />
                            }
                            label={brandName}
                            onChange={() => setSelectedBrand(brandName)}
                          />
                        ))
                    : filterProduct
                        .reduce((uniqueBrands, product) => {
                          if (!uniqueBrands.includes(product.brand.Name)) {
                            uniqueBrands.push(product.brand.Name);
                          }
                          return uniqueBrands;
                        }, [])
                        .map((brandName) => (
                          <FormControlLabel
                            key={brandName}
                            control={
                              <Checkbox checked={selectedBrand === brandName} />
                            }
                            label={brandName}
                            onChange={() => setSelectedBrand(brandName)}
                          />
                        ))}
                </FormGroup>
              </div>
            </div>
            <div className="p-1 border-b">
              <div className="flex flex-col">
                <p className="text-sm font-medium flex flex-row justify-between pr-2">
                  CUSTOMER RATINGS{" "}
                  <IoIosArrowUp size={"1.2em"} onClick={HandleDisplay} />
                </p>
                <FormGroup className={hidden ? " !hidden" : ""}>
                  <FormControlLabel control={<Checkbox />} label="4★ & above" />
                  <FormControlLabel control={<Checkbox />} label="3★ & above" />
                  <FormControlLabel control={<Checkbox />} label="2★ & above" />
                  <FormControlLabel control={<Checkbox />} label="1★ & above" />
                </FormGroup>
              </div>
            </div>
          </section>
          <section className="mt-2 w-full  p-3 bg-white">
            {/* <div className=" m-2 h-full grid grid-cols-1"> */}
            <div
              className={
                category === "electronics"
                  ? " m-2 h-full grid grid-cols-1 "
                  : " m-2 h-full gap-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2"
              }
            >
              {laoding ? (
                <>
                  <div className="w-full h-full flex justify-center ">
                    <iframe
                      src="https://lottie.host/?file=adbf2be0-5e20-479c-ac8b-63afb952b7a7/KmWdrrTqCZ.json"
                      title="loading"
                    ></iframe>
                  </div>
                </>
              ) : key.length === 0 ? (
                product.length === 0 ? (
                  <NotFound title={"This category not found"} />
                ) : (
                  filterByPrice?.map((product) => (
                    <ProductCard
                      {...product}
                      key={product._id}
                      refData={"overview"}
                      path={"product"}
                    />
                  ))
                )
              ) : filterProduct?.length === 0 ? (
                <NotFound title={"No result found"} />
              ) : (
                filterProduct?.map((product) => (
                  <ProductCard
                    {...product}
                    key={product._id}
                    refData={"overview"}
                    path={"product"}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Product;
// product.key === key ?
