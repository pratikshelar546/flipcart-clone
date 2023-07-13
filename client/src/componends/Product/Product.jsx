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
const Product = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const categories = [
        "Electronics",
        "Mobiles",
        "Laptops",
        "Fashion",
        "Appliances",
        "Home",
    ];
    const [product, setProduct] = useState();
    const [hidden, setHidden] = useState(false);
    const [category, setCategory] = useState(location.state ? location.state : '');
    // console.log(category);

    const [price, setPrice] = useState([0, 200000]);
    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
        // console.log(price);
    };
    const HandleDisplay = () => {
        setHidden(!hidden);
    };
    useEffect(() => {
        dispatch(productByCategory(category)).then((data) => {

            setProduct(data.payload);

        })
    }, [dispatch])

    // console.log(product[0]?.Highlights?.length);
    // const filterProduct = product?.filter(productss =>{
    //     return productss.Highlights.length === 0
    // });
    // console.log(filterProduct);
    // console.log(category);
    return (
        <>
            <main className="w-full relative ">
                <div className="flex gap-2">
                    <section className="m-2 w-64 h-full bg-white">
                        <div className="p-1 border-b">
                            <div className="flex flex-row p-2 justify-between  items-center">
                                <h1 className="text-lg">Filters</h1>
                                <p className="text-sm text-blue-600">CLEAR ALL</p>
                            </div>
                        </div>
                        <div className="p-1 border-b">
                            <p className="text-sm">CATEGORIES</p>
                            <div className="flex flex-col pb-1">
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="category-radio-buttons-group"
                                        onChange={(e) => setCategory(e.target.value)}
                                        name="category-radio-buttons"
                                        value={category}
                                    >
                                        {categories.map((el, i) => (
                                            <FormControlLabel key={i}
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
                            <div className="flex flex-col gap-2 border-b px-1">
                                <span className="font-medium text-sm">PRICE</span>
                                <div className="px-3">
                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        getAriaLabel={() => "Price range slider"}
                                        min={0}
                                        max={200000}
                                    />

                                    <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
                                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                                            ₹{price[0].toLocaleString()}
                                        </span>
                                        <span className="font-medium text-gray-400">to</span>
                                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                                            ₹{price[1].toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-1 border-b">
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">BRAND</p>
                                MI
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
                        <div className="p-1 border-b"></div>
                    </section>
                    <section className="mt-2  p-3 bg-white">
                        {/* <div className=" m-2 h-full grid grid-cols-1"> */}
                            <div className={category==='electronics' ? ' m-2 h-full grid grid-cols-1 ':' m-2 h-full gap-4 grid grid-cols-4'}>
                            {product?.map((product) => (
                                <ProductCard {...product} key={product._id} />
                            ))}
                        </div>
                    </section>
                </div>

            </main>
        </>
    );
};

export default Product;
