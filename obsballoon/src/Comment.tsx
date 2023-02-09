import { useState } from "react"

type Msg = {
    attr:{
        handle:string
    }
    ComText:string
}

type Props={
    index:number
    value:Msg
    animScroll:number
}

export default function Comment(props:Props){
/*   const [animation,setAnimation] = useState("");
  if(props.index === 0){
    setAnimation("animate-slide-in-right");
  } */

  return(
    <div className={props.index === props.animScroll ? "animate-slide-in-right" : "" }>
      <div className=' bg-white p-1 m-1 rounded bg-opacity-80 w-fit shadow-lg'>
        <div className=" bg-blue-400 w-fit p-1 rounded font-bold stroke-shadow text-white text-xl bg-opacity-80 flex flex-row">
          <div className=' w-32 overflow-hidden overflow-ellipsis whitespace-nowrap'>{props.value.attr.handle}</div><div className='ml-1 w-96 break-words'>「{props.value.ComText}」</div>
        </div>
      </div>
    </div>
  )
}