import React from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import {MdNotifications , MdKeyboardArrowDown} from "react-icons/md"
import {BsFillQuestionSquareFill} from "react-icons/bs"
import {TfiStatsUp} from "react-icons/tfi"
import {  CgCardHearts, CgGift, CgHeart, CgProfile, CgShoppingCart, CgSoftwareDownload } from "react-icons/cg"
const Lgnav = () => {
    return (
        <>
            <div className="h-full hidden lg:flex">
                <section className="w-full bg-blue-600 justify-center flex items-center">
                    <header className="text-white  py-3 flex flex-row gap-4">
                        <Link to="/" className="text-2xl ">
                            ShopKart
                        </Link>
                        <div className="bg-white flex flex-row px-1 ">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search for product, brands and more"
                                className="w-96 outline-none text-black px-4"
                            />
                            <BiSearch size={"1.5rem"} color="blue" className="mt-1" />
                        </div>

                        <div className="ml-10">
                            <ul className="flex flex-row gap-12 outline-none ">
                                <li className="group relative bg-white text-blue-500 px-7   cursor-pointer outline-none font-normal text-lg">
                                    <Link >Login</Link>
                                    <div className="-ml-24 group-hover:block drop-shadow-lg shadow-md absolute hidden h-auto left-10">
                                        <div className="mb-4"> </div>
                                        <div>
                                            <ul className="top-0 w-56 bg-white shadow font-medium text-sm">
                                                <li className=" hover:bg-gray-100  gap-5 border-b border-gray-300 p-4 flex flex-row"><a className="block text-gray-700 cursor-pointer" href="/">New customer?</a><Link to="/">Sign up</Link></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className="flex flex-row text-black   cursor-pointer" href="/"> <CgProfile size={"1.1rem"} className="mx-4 mt-1" /> My Profile </a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgShoppingCart size={"1.1rem"} className="mx-4 mt-1" />orders</a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgHeart size={"1.1rem"} className="mx-4 mt-1" />Wishlist</a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgCardHearts size={"1.1rem"} className="mx-4 mt-1" />Rewards</a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgGift size={"1.1rem"} className="mx-4 mt-1" />Gift cards</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="cursor-pointer outline-none font-normal text-lg">Become a seller</li>
                                <li className="group relative  cursor-pointer outline-none font-normal text-lg"><Link className="flex">More <MdKeyboardArrowDown size={"1em"} className="mt-2 group-hover:rotate-180 duration-150"/></Link>
                                <div className="-ml-24 group-hover:block drop-shadow-lg shadow-md absolute hidden h-auto left-10">
                                    <div className="mb-4"></div>
                                    <ul className="top-0 w-56 bg-white shadow">
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <MdNotifications size={"1.1rem"} className="mx-4 mt-1" />Notification Preferance</a></li>
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <BsFillQuestionSquareFill size={"1.1rem"} className="mx-4 mt-1" />24x7 Customer care</a></li>
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <TfiStatsUp size={"1.1rem"} className="mx-4 mt-1" />Adverties</a></li>
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <CgSoftwareDownload size={"1.1rem"} className="mx-4 mt-1" />Download App</a></li>
                                    </ul>
                                    </div>
                                </li>
                                <li className="cursor-pointer outline-none font-normal text-lg flex"><CgShoppingCart className="mt-1 mr-2"/>Cart</li>
                            </ul>
                        </div>
                    </header>
                </section>
            </div>
        </>
    );
};
const Mdnav =()=>{
return(
    <>
     <div className="h-full max-sm:hidden sm:hidden md:flex lg:hidden">
                <section className="w-full bg-blue-600 justify-center flex items-center">
                    <header className="text-white  py-3 flex flex-row gap-4">
                        <Link to="/" className="text-2xl ">
                            ShopKart
                        </Link>
                        <div className="bg-white flex flex-row px-0 ">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search for product, brands and more"
                                className="w-full outline-none ml-2 text-black "
                            />
                            <BiSearch size={"1.5rem"} color="blue" className="mt-1" />
                        </div>

                        <div className="ml-6">
                            <ul className="flex flex-row gap-5 outline-none ">
                                <li className="group relative bg-white text-blue-500 px-5 cursor-pointer outline-none font-normal text-lg">
                                    <Link >Login</Link>
                                    <div className="-ml-24 group-hover:block drop-shadow-lg shadow-md absolute hidden h-auto left-10">
                                        <div className="mb-4"> </div>
                                        <div>
                                            <ul className="top-0 w-56 bg-white shadow font-medium text-sm">
                                                <li className=" hover:bg-gray-100  gap-5 border-b border-gray-300 p-4 flex flex-row"><a className="block text-gray-700 cursor-pointer" href="/">New customer?</a><Link to="/">Sign up</Link></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className="flex flex-row text-black   cursor-pointer" href="/"> <CgProfile size={"1.1rem"} className="mx-4 mt-1" /> My Profile </a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgShoppingCart size={"1.1rem"} className="mx-4 mt-1" />orders</a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgHeart size={"1.1rem"} className="mx-4 mt-1" />Wishlist</a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgCardHearts size={"1.1rem"} className="mx-4 mt-1" />Rewards</a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgGift size={"1.1rem"} className="mx-4 mt-1" />Gift cards</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="cursor-pointer outline-none font-normal text-lg">Become a seller</li>
                                <li className="group relative  cursor-pointer outline-none font-normal text-lg"><Link className="flex">More <MdKeyboardArrowDown size={"1em"} className="mt-2 group-hover:rotate-180 duration-150"/></Link>
                                <div className="-ml-24 group-hover:block drop-shadow-lg shadow-md absolute hidden h-auto left-10">
                                    <div className="mb-4"></div>
                                    <ul className="top-0 w-56 bg-white shadow">
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <MdNotifications size={"1.1rem"} className="mx-4 mt-1" />Notification Preferance</a></li>
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <BsFillQuestionSquareFill size={"1.1rem"} className="mx-4 mt-1" />24x7 Customer care</a></li>
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <TfiStatsUp size={"1.1rem"} className="mx-4 mt-1" />Adverties</a></li>
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <CgSoftwareDownload size={"1.1rem"} className="mx-4 mt-1" />Download App</a></li>
                                    </ul>
                                    </div>
                                </li>
                                <li className="cursor-pointer outline-none font-normal text-lg flex"><CgShoppingCart className="mt-1 mr-2"/>Cart</li>
                            </ul>
                        </div>
                    </header>
                </section>
            </div>
    </>
)
}
const Smnav =()=>{
    return(
        <>
        <div className="h-full md:hidden flex">
                <section className="w-full bg-blue-600 justify-center flex items-center">
                    <header className="text-white  py-3 flex flex-row gap-4">
                        <Link to="/" className="text-2xl ">
                            ShopKart
                        </Link>
                        <div className="bg-white flex flex-row px-0 ">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search for product, brands and more"
                                className="w-full outline-none ml-2 text-black "
                            />
                            <BiSearch size={"1.5rem"} color="blue" className="mt-1" />
                        </div>

                        <div className="ml-3">
                            <ul className="flex flex-row gap-5 outline-none ">
                                <li className="group relative bg-white text-blue-500 px-5 cursor-pointer outline-none font-normal text-lg">
                                    <Link >Login</Link>
                                    {/* <div className="-ml-24 group-hover:block drop-shadow-lg shadow-md absolute hidden h-auto left-10">
                                        <div className="mb-4"> </div>
                                        <div>
                                            <ul className="top-0 w-56 bg-white shadow font-medium text-sm">
                                                <li className=" hover:bg-gray-100  gap-5 border-b border-gray-300 p-4 flex flex-row"><a className="block text-gray-700 cursor-pointer" href="/">New customer?</a><Link to="/">Sign up</Link></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className="flex flex-row text-black   cursor-pointer" href="/"> <CgProfile size={"1.1rem"} className="mx-4 mt-1" /> My Profile </a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgShoppingCart size={"1.1rem"} className="mx-4 mt-1" />orders</a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgHeart size={"1.1rem"} className="mx-4 mt-1" />Wishlist</a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgCardHearts size={"1.1rem"} className="mx-4 mt-1" />Rewards</a></li>
                                                <li className=" hover:bg-gray-100 py-4 border-b border-gray-300"><a className=" flex flex-row text-black   cursor-pointer" href="/"> <CgGift size={"1.1rem"} className="mx-4 mt-1" />Gift cards</a></li>
                                            </ul>
                                        </div>
                                    </div> */}
                                </li>
                                <li className="cursor-pointer outline-none font-normal text-lg flex"><CgShoppingCart className="mt-1 mr-2"/>Cart</li>
                                <div className="hidden">

                               
                                <li className="cursor-pointer outline-none font-normal text-lg">Become a seller</li>
                                <li className="group relative  cursor-pointer outline-none font-normal text-lg"><Link className="flex">More <MdKeyboardArrowDown size={"1em"} className="mt-2 group-hover:rotate-180 duration-150"/></Link>
                                <div className="-ml-24 group-hover:block drop-shadow-lg shadow-md absolute hidden h-auto left-10">
                                    <div className="mb-4"></div>
                                    <ul className="top-0 w-56 bg-white shadow">
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <MdNotifications size={"1.1rem"} className="mx-4 mt-1" />Notification Preferance</a></li>
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <BsFillQuestionSquareFill size={"1.1rem"} className="mx-4 mt-1" />24x7 Customer care</a></li>
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <TfiStatsUp size={"1.1rem"} className="mx-4 mt-1" />Adverties</a></li>
                                    <li className=" hover:bg-gray-100 py-4 border-b text-sm border-gray-300"><a className=" flex flex-row text-black cursor-pointer" href="/"> <CgSoftwareDownload size={"1.1rem"} className="mx-4 mt-1" />Download App</a></li>
                                    </ul>
                                    </div>
                                </li>
                                
                                </div>
                            </ul>
                        </div>
                    </header>
                </section>
            </div>
        </>
    )
}
const HomeNav = () => {
    return (
        <>
            <Lgnav />
            <Mdnav/>
            <Smnav/>
        </>
    );
};

export default HomeNav;
