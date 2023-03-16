import { motion, AnimatePresence, transform } from "framer-motion"
import { useState, useContext } from "react"
import ComText from "./isComText"
import { Msg } from "./type"
import configData from "./config.json";
import { RandomGenContext } from "./randomGen";

type Props={
    index:number
    value:Msg
}

export default function Balloon(props:Props){
    const randomGen = useContext(RandomGenContext)
    const [position, setPosition] = useState<{x: number, y: number}>(() => randomGen.getRandomPoint())
//    const [top, setTop] = useState<number>(Math.floor(Math.random() * (window.innerHeight - 100) - 50))
//    const [left, setLeft] = useState<number>(Math.floor(Math.random() * (window.innerWidth - 200)-100))
    const [SVGIndex,setSVGIndex] = useState<string>(configData.ballonSVGArray[Math.floor(Math.random() * configData.ballonSVGArray.length)])
    const [isTurning,setIsTurning] = useState<number>(()=>{
        if(Math.floor(Math.random()*2)===0){
            return 1
        }else{
            return -1
        }
    })

    return(
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
                    top: position.y + "px",
                    left: position.x + "px",
                    zIndex:props.index,
                    backgroundImage:`url("./hukidashi/${SVGIndex}")`
                }}
                className={`bg-center bg-no-repeat w-[35rem] h-[29rem] text-4xl p-5 flex flex-col justify-center text-center absolute text-white`}
                >
                    <div style={{transform:`scale(${isTurning},1)`}}>
                        <div className="font-bold">{ComText(props.value.ComText)}</div>
                        <div>{props.value.attr.handle}</div>
                    </div> 
            </motion.div>
    )
}