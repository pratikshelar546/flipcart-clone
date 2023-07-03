import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr"
export function NextArrow(props) {
   
    return (
        <>
            <GrNext className={` !right-2 !bg-white !h-28 !w-10 !rounded-l overflow-auto z-30 ${props.className} ${props.className ==='slick-arrow slick-next slick-disabled'? '!hidden':'block'}`} onClick={props.onClick} />
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
            <GrPrevious className={` !left-2 !bg-white !h-28 !w-10 !rounded-r overflow-auto z-30 ${props.className}  ${props.className ==='slick-arrow slick-prev slick-disabled'? '!hidden':'block'}`} onClick={props.onClick} />
        </>
    );
}