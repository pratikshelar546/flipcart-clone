import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { BiSearch, BiSolidUserCircle } from "react-icons/bi";
import { MdNotifications, MdKeyboardArrowDown } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { TfiStatsUp } from "react-icons/tfi";
import {
  CgCardHearts,
  CgGift,
  CgHeart,
  CgLogOut,
  CgProfile,
  CgShoppingCart,
  CgSoftwareDownload,
} from "react-icons/cg";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import { useDispatch } from "react-redux";
import { getproductBySearch } from "../../redux/reducers/Products/productAction";

const Lgnav = ({ Login, user, SignUp, handleData, produt, loading, setLoading }) => {
  const login = () => {
    Login();
  };
  const Signup = () => {
    SignUp();
  };
  const LogOut = () => {
    localStorage.removeItem("newUser");
    localStorage.removeItem("user");
    toast.success("Logout successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  //   const search = (text)=>{
  //     dispatch(getproductBySearch(text)).then((data) => {
  //         setProduct(data?.payload);
  //   })
  // }
  //    console.log(user?.fullName);
  const [text, setText] = useState("")
  // const [loading, setLoading] = useState(false);
  const handlesData = (e) => {
    setLoading(true);
    handleData(e.target.value);
    setText(e.target.value);
  }
  // console.log(produt);
  return (
    <>
      <div className="w-full hidden justify-center sticky top-0 z-30  lg:flex">
        <section className="w-full bg-blue-600 justify-center flex items-center">
          <header className="text-white  py-3 flex flex-row gap-4">
            <Link to="/" className="text-2xl ">
              ShopKart
            </Link>
            <div className="  flex-col  relative bg-blue-600 flex h-auto left-10">
              <div className="bg-white flex  flex-row px-1 rounded ">
                <input
                  type="text"
                  name="search"
                  id="search"
                  onChange={handlesData}
                  placeholder="Search for product, brands and more"
                  className="w-96 outline-none  text-black px-4"
                />
                <BiSearch size={"1.5rem"} color="blue" className="mt-1" />
              </div>
              <div className={text ? "bg-white text-black w-full top-10 absolute " : 'hidden'}>
                {loading ? '' : produt.length > 0 ?
                  produt?.map((product) => (

                    <h1 className="p-3 border-b hover:text-blue-600" key={product._id}>{product.title}</h1>
                  )) : <h1 className=" place-content-center p-3 ">No product found</h1>

                }

              </div>
            </div>
            <div className="ml-10">
              <ul className="flex flex-row gap-12 outline-none ">
                <li className="group relative  text-blue-500  rounded  cursor-pointer outline-none font-normal text-lg">
                  {user?.fullName ? (
                    <p className=" flex bg-blue-600 text-white">
                      ShopKart{" "}
                      <MdKeyboardArrowDown
                        size={"1em"}
                        className="mt-2 group-hover:rotate-180 duration-150"
                        color="white"
                      />{" "}
                    </p>
                  ) : (
                    <button onClick={login} className="px-7 ">
                      Login
                    </button>
                  )}
                  <div className="-ml-24 overflow-auto z-30 group-hover:block drop-shadow-lg shadow-md absolute hidden h-auto left-10">
                    <div className="mb-4"> </div>
                    <div>
                      <ul className="top-0 w-56 bg-white shadow font-medium text-sm">
                        {user?.fullName ? null : (
                          <li className=" hover:bg-gray-100  gap-5 border-b border-gray-300 p-4 flex flex-row">
                            <a
                              className="block text-gray-700 cursor-pointer"
                              href="/"
                            >
                              New customer?
                            </a>
                            <button onClick={Signup}>Sign up</button>
                          </li>
                        )}
                        <li className=" hover:bg-gray-100 py-4 border-b border-gray-300">
                          <a
                            className="flex flex-row text-black   cursor-pointer"
                            href="/"
                          >
                            {" "}
                            <CgProfile
                              size={"1.1rem"}
                              className="mx-4 mt-1"
                            />{" "}
                            My Profile{" "}
                          </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-4 border-b border-gray-300">
                          <a
                            className=" flex flex-row text-black   cursor-pointer"
                            href="/"
                          >
                            {" "}
                            <CgShoppingCart
                              size={"1.1rem"}
                              className="mx-4 mt-1"
                            />
                            orders
                          </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-4 border-b border-gray-300">
                          <a
                            className=" flex flex-row text-black   cursor-pointer"
                            href="/"
                          >
                            {" "}
                            <CgHeart size={"1.1rem"} className="mx-4 mt-1" />
                            Wishlist
                          </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-4 border-b border-gray-300">
                          <a
                            className=" flex flex-row text-black   cursor-pointer"
                            href="/"
                          >
                            {" "}
                            <CgCardHearts
                              size={"1.1rem"}
                              className="mx-4 mt-1"
                            />
                            Rewards
                          </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-4 border-b border-gray-300">
                          <a
                            className=" flex flex-row text-black   cursor-pointer"
                            href="/"
                          >
                            {" "}
                            <CgGift size={"1.1rem"} className="mx-4 mt-1" />
                            Gift cards
                          </a>
                        </li>
                        {user?.fullName ? (
                          <li className="hover:bg-gray-100 py-4 border-b border-gray-300">
                            <a
                              className=" text-black cursor-pointer flex"
                              href="/"
                              onClick={LogOut}
                            >
                              <CgLogOut className="mx-4 mt-1" size={"1.1rem"} />{" "}
                              LogOut
                            </a>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="cursor-pointer outline-none font-normal text-lg">
                  Become a seller
                </li>
                <li className="group relative  cursor-pointer outline-none font-normal text-lg">
                  <Link className="flex">
                    More{" "}
                    <MdKeyboardArrowDown
                      size={"1em"}
                      className="mt-2 group-hover:rotate-180 duration-150"
                    />
                  </Link>
                  <div className="-ml-24 group-hover:block overflow-auto z-30 drop-shadow-lg shadow-md absolute hidden h-auto left-10">
                    <div className="mb-4"></div>
                    <ul className="top-0 w-56   bg-white shadow">
                      <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300">
                        <a
                          className=" flex flex-row text-black cursor-pointer"
                          href="/"
                        >
                          {" "}
                          <MdNotifications
                            size={"1.1rem"}
                            className="mx-4 mt-1"
                          />
                          Notification Preferance
                        </a>
                      </li>
                      <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300">
                        <a
                          className=" flex flex-row text-black cursor-pointer"
                          href="/"
                        >
                          {" "}
                          <BsFillQuestionSquareFill
                            size={"1.1rem"}
                            className="mx-4 mt-1"
                          />
                          24x7 Customer care
                        </a>
                      </li>
                      <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300">
                        <a
                          className=" flex flex-row text-black cursor-pointer"
                          href="/"
                        >
                          {" "}
                          <TfiStatsUp size={"1.1rem"} className="mx-4 mt-1" />
                          Adverties
                        </a>
                      </li>
                      <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300">
                        <a
                          className=" flex flex-row text-black cursor-pointer"
                          href="/"
                        >
                          {" "}
                          <CgSoftwareDownload
                            size={"1.1rem"}
                            className="mx-4 mt-1"
                          />
                          Download App
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="cursor-pointer outline-none font-normal text-lg flex">
                  <CgShoppingCart className="mt-1 mr-2" />
                  Cart
                </li>
              </ul>
            </div>
          </header>
        </section>
      </div>
    </>
  );
};
const Mdnav = ({ Login, user, SignUp, handleData, produt,loading,setLoading }) => {
  const login = () => {
    Login();
  };
  const Signup = () => {
    SignUp();
  };
  const LogOut = () => {
    localStorage.removeItem("newUser");
    localStorage.removeItem("user");
    toast.success("Logout successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // console.log(handleData.text);
  const [text, setText] = useState();
  const handlesData = (e) => {
    setLoading(true);
    handleData(e.target.value);
    setText(e.target.value);
  }
  return (
    <>
      <div className="h-full max-sm:hidden sticky top-0 z-30 sm:hidden md:flex lg:hidden">
        <section className="w-full bg-blue-600 justify-center flex items-center">
          <header className="text-white  py-3 flex flex-row gap-4">
            <Link to="/" className="text-2xl ">
              ShopKart
            </Link>
            {/* <div className="bg-white flex flex-row px-0 ">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search for product, brands and more"
                className="w-full outline-none ml-2 text-black "
              />
              <BiSearch size={"1.5rem"} color="blue" className="mt-1" />
            </div> */}
            <div className="  flex-col drop-shadow-lg shadow-md relative px-0 flex w-full left-10">
              <div className="bg-white flex  flex-row px-1 rounded ">
                <input
                  type="text"
                  name="search"
                  id="search"
                  onChange={handlesData}
                  placeholder="Search for product, brands and more"
                  className="w-full outline-none ml-2 text-black"
                />
                <BiSearch size={"1.5rem"} color="blue" className="mt-1" />
              </div>
              <div className={text ? "bg-white text-black w-full top-10 absolute" : 'hidden'}>
              {loading ? '' : produt.length > 0 ?
                  produt?.map((product) => (

                    <h1 className="p-3 borber-b" key={product._id}>{product.title}</h1>
                  )) : <h1 className=" place-content-center p-3 ">No product found</h1>

                }
              </div>
            </div>
            <div className="ml-6">
              <ul className="flex flex-row gap-5 outline-none ">
                <li className="group relative  px-5 cursor-pointer outline-none font-normal text-lg">
                  {user?.fullName ? (
                    <p className=" flex bg-blue-600 text-white">
                      ShopKart{" "}
                      <MdKeyboardArrowDown
                        size={"1em"}
                        className="mt-2 group-hover:rotate-180 duration-150"
                        color="white"
                      />{" "}
                    </p>
                  ) : (
                    <button
                      onClick={login}
                      className="pl-4 pr-2 bg-white text-blue-500 flex"
                    >
                      Login{" "}
                      <MdKeyboardArrowDown
                        size={"1em"}
                        className="mt-2 group-hover:rotate-180 duration-150"
                        color="blue"
                      />
                    </button>
                  )}
                  <div className="-ml-24 group-hover:block drop-shadow-lg shadow-md absolute hidden h-auto left-10">
                    <div className="mb-4"> </div>
                    <div>
                      <ul className="top-0 w-56 bg-white shadow font-medium text-sm">
                        {user?.fullName ? null : (
                          <li className=" hover:bg-gray-100  gap-5 border-b border-gray-300 p-4 flex flex-row">
                            <a
                              className="block text-gray-700 cursor-pointer"
                              href="/"
                            >
                              New customer?
                            </a>
                            <button className="text-blue-600" onClick={Signup}>
                              Sign up
                            </button>
                          </li>
                        )}
                        <li className=" hover:bg-gray-100 py-4 border-b border-gray-300">
                          <a
                            className="flex flex-row text-black   cursor-pointer"
                            href="/"
                          >
                            {" "}
                            <CgProfile
                              size={"1.1rem"}
                              className="mx-4 mt-1"
                            />{" "}
                            My Profile{" "}
                          </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-4 border-b border-gray-300">
                          <a
                            className=" flex flex-row text-black   cursor-pointer"
                            href="/"
                          >
                            {" "}
                            <CgShoppingCart
                              size={"1.1rem"}
                              className="mx-4 mt-1"
                            />
                            orders
                          </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-4 border-b border-gray-300">
                          <a
                            className=" flex flex-row text-black   cursor-pointer"
                            href="/"
                          >
                            {" "}
                            <CgHeart size={"1.1rem"} className="mx-4 mt-1" />
                            Wishlist
                          </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-4 border-b border-gray-300">
                          <a
                            className=" flex flex-row text-black   cursor-pointer"
                            href="/"
                          >
                            {" "}
                            <CgCardHearts
                              size={"1.1rem"}
                              className="mx-4 mt-1"
                            />
                            Rewards
                          </a>
                        </li>
                        <li className=" hover:bg-gray-100 py-4 border-b border-gray-300">
                          <a
                            className=" flex flex-row text-black   cursor-pointer"
                            href="/"
                          >
                            {" "}
                            <CgGift size={"1.1rem"} className="mx-4 mt-1" />
                            Gift cards
                          </a>
                        </li>
                        {user?.fullName ? (
                          <li className="hover:bg-gray-100 py-4 border-b border-gray-300">
                            <a
                              className=" text-black cursor-pointer flex"
                              href="/"
                              onClick={LogOut}
                            >
                              <CgLogOut className="mx-4 mt-1" size={"1.1rem"} />{" "}
                              LogOut
                            </a>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="cursor-pointer outline-none font-normal text-lg">
                  Become a seller
                </li>
                <li className="group relative  cursor-pointer outline-none font-normal text-lg">
                  <Link className="flex">
                    More{" "}
                    <MdKeyboardArrowDown
                      size={"1em"}
                      className="mt-2 group-hover:rotate-180 duration-150"
                    />
                  </Link>
                  <div className="-ml-24 group-hover:block drop-shadow-lg shadow-md absolute hidden h-auto left-10">
                    <div className="mb-4"></div>
                    <ul className="top-0 w-56 bg-white shadow">
                      <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300">
                        <a
                          className=" flex flex-row text-black cursor-pointer"
                          href="/"
                        >
                          {" "}
                          <MdNotifications
                            size={"1.1rem"}
                            className="mx-4 mt-1"
                          />
                          Notification Preferance
                        </a>
                      </li>
                      <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300">
                        <a
                          className=" flex flex-row text-black cursor-pointer"
                          href="/"
                        >
                          {" "}
                          <BsFillQuestionSquareFill
                            size={"1.1rem"}
                            className="mx-4 mt-1"
                          />
                          24x7 Customer care
                        </a>
                      </li>
                      <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300">
                        <a
                          className=" flex flex-row text-black cursor-pointer"
                          href="/"
                        >
                          {" "}
                          <TfiStatsUp size={"1.1rem"} className="mx-4 mt-1" />
                          Adverties
                        </a>
                      </li>
                      <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300">
                        <a
                          className=" flex flex-row text-black cursor-pointer"
                          href="/"
                        >
                          {" "}
                          <CgSoftwareDownload
                            size={"1.1rem"}
                            className="mx-4 mt-1"
                          />
                          Download App
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="cursor-pointer outline-none font-normal text-lg flex">
                  <CgShoppingCart className="mt-1 mr-2" />
                  Cart
                </li>
              </ul>
            </div>
          </header>
        </section>
      </div>
    </>
  );
};
const Smnav = ({ Login, user, SignUp, handleData, produt,loading,setLoading }) => {
  const login = () => {
    Login();
  };
  // const Signup = ()=>{
  //     SignUp();
  // }
  const LogOut = () => {
    localStorage.removeItem("newUser");
    localStorage.removeItem("user");
    toast.success("Logout successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const [text, setText] = useState("");
  const handlesData = (e) => {
    setLoading(true);
    handleData(e.target.value);
    setText(e.target.value);
  }
  return (
    <>
      <div className="h-full md:hidden w-screen flex">
        <section className=" bg-blue-600 w-screen flex ">
          <header className="text-white w-full px-4 py-3 flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <Link to="/" className="text-md ml-6 ">

                ShopKart
              </Link>

              <div className="">
                <ul className="flex flex-row gap-2 outline-none ">
                  <li className="group relative  px-2 cursor-pointer outline-none font-normal text-sm">
                    {user?.fullName ? (
                      <button
                        className=" flex bg-blue-600 text-white"
                        onClick={LogOut}
                      >
                        <BiSolidUserCircle
                          size={"1.5em"}
                          className="mt-1 mr-2"
                        />
                      </button>
                    ) : (
                      <>
                        <button onClick={login} className=" ">
                          Login
                        </button>
                      </>
                    )}
                  </li>
                  <li className="cursor-pointer outline-none font-normal mr-0 text-lmd flex">
                    <CgShoppingCart className="mt-1 mr-3" size={"1.5em"} />
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="bg-white flex flex-row px-3 h-8 w-full">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search for product, brands and more"
                className=" outline-none w-full  text-black text-sm"
              />
              <BiSearch size={"1.5em"} color="blue" className="mt-1" />
            </div> */}
            <div className="  flex-col drop-shadow-lg shadow-md overflow-visible z-30 relative px-0 flex w-full ">
              <div className="bg-white flex  flex-row px-1 rounded ">
                <input
                  type="text"
                  name="search"
                  id="search"
                  onChange={handlesData}
                  placeholder="Search for product, brands and more"
                  className="outline-none w-full  text-black text-sm"
                />
                <BiSearch size={"1.5rem"} color="blue" className="mt-1" />
              </div>
              <div className={text ? "bg-white text-black w-full top-10 absolute " : 'hidden'}>
              {loading ? '' : produt.length > 0 ?
                  produt?.map((product) => (

                    <h1 className="p-3 borber-b" key={product._id}>{product.title}</h1>
                  )) : <h1 className=" place-content-center p-3 ">No product found</h1>

                }
              </div>
            </div>
          </header>
        </section>
      </div>
    </>
  );
};
const HomeNav = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const openLoginModel = () => setOpenLogin(true);
  const openSignupModel = () => setOpenSignup(true);
  const [textSearch, setTextSearch] = useState("");
  const [produt, setProduct] = useState([]);
  const [loading, setLoading] = useState(false)
  //   console.log(textSearch);
  const dispatch = useDispatch();

  const handleData = (text) => {
    // setLoading(true)
    setTextSearch(text);
    // console.log(text);
  }
  useEffect(() => {
    if (textSearch) {
      const debounce = setTimeout(() => {
        dispatch(getproductBySearch(textSearch)).then((data) => {
          // console.log(produt);
          setLoading(false)
          setProduct(data?.payload);
          // console.log(produt);
        });
      }, 500);
      return () => {
        clearTimeout(debounce);
      }
    }
  }, [textSearch, dispatch]);

  // useEffect(() => {
  //   if (textSearch) {
  //     const debounce = setTimeout(() => {
  //       dispatch(getproductBySearch(textSearch)).then((data) => {
  //         // console.log(produt);
  //         setLoading(false)
  //         setProduct(data?.payload);
  //       });
  //     }, 500);
  //     return () => {
  //       clearTimeout(debounce);
  //     }
  //   }
  // }, [textSearch, dispatch]);
  // console.log(produt);
  const user = JSON.parse(localStorage.getItem("newUser"));

  return (
    <>
      <Login isOpen={openLogin} setIsOpen={setOpenLogin} />
      <SignUp isOpen={openSignup} setIsOpen={setOpenSignup} />
      <Lgnav user={user} Login={openLoginModel} produt={produt} loading={loading} setLoading={setLoading} handleData={handleData} SignUp={openSignupModel} />
      <Mdnav user={user} Login={openLoginModel} produt={produt} loading={loading} setLoading={setLoading} handleData={handleData} SignUp={openSignupModel} />
      <Smnav user={user} Login={openLoginModel} produt={produt} loading={loading} setLoading={setLoading} handleData={handleData} SignUp={openSignupModel} />
    </>
  );
};

export default HomeNav;
