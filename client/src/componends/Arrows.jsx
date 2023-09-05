import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr"
export function NextArrow(props) {
   
    return (
        <>
            <GrNext className={` !right-4 !bg-white !h-3 !w-6 lg:!h-7 lg:!w-10 !rounded-l !overflow-hidden  ${props.className} ${props.className ==='slick-arrow slick-next slick-disabled'? '!hidden':'!block'}`} onClick={props.onClick} size={"1.7rem"} />
            {/* <div
                className={props.className}
                style={{ ...props.style,color:"black", backgroundColor: "gray", overflow:"auto",zIndex:"3",marginRight:"33px" ,height:"100px",justifyContent:"center",width:"53px" }}
                onClick={props.onClick}
            ></div> */}
        </>
    );
}
export function PrevArrow(props) {
    return (
        <>
            <GrPrevious className={` !left-2 !bg-white !h-3 !w-6 lg:!h-7 lg:!w-10   !rounded-r !overflow-auto z-10 ${props.className}  ${props.className ==='slick-arrow slick-prev slick-disabled'? '!hidden':'!block'}`} onClick={props.onClick} size={'1.7rem'} />
        </>
    );
}