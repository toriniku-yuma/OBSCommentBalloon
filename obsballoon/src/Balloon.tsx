import { motion, AnimatePresence, transform } from "framer-motion"
import { useState } from "react"
import ComText from "./isComText"
import { Msg } from "./type"
import configData from "./config.json";

type Props={
    index:number
    value:Msg
}

export default function Ballon(props:Props){
    const windowSize = [500,1200];
    const [top, setTop] = useState<number>(Math.floor(Math.random() * windowSize[0]))
    const [left, setLeft] = useState<number>(Math.floor(Math.random() * windowSize[1]))
    const [SVGIndex,setSVGIndex] = useState<string>(configData.ballonSVGArray[Math.floor(Math.random() * configData.ballonSVGArray.length)])
    const [isTurning,setIsTurning] = useState<number>(()=>{
        if(Math.floor(Math.random()*2)===0){
            return 1
        }else{
            return -1
        }
    })

    return(
        <div className="">
            <motion.div 
                initial={{ opacity: 0, 
                            scale:0}}
                animate={{ opacity: 1, 
                            scale:1,
                            scaleX:isTurning}}
                exit={{ opacity: 0,
                        scale:0}}
                key={props.index}
                style={{
                    top: top+ "px",
                    left: left + "px",
                    zIndex:props.index,
                    backgroundImage:`url("../public/hukidashi/${SVGIndex}")`
                }}
                className={`bg-center bg-no-repeat w-[24rem] h-[18rem] text-xl p-5 flex flex-col justify-center text-center absolute text-white`}
                >
                    <div style={{transform:`scale(${isTurning},1)`}}>
                        <div className="font-bold">{ComText(props.value.ComText)}</div>
                        <div>{props.value.attr.handle}</div>
                    </div> 
            </motion.div>
        </div>
    )
}