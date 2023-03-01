import { useState } from "react"
import ComText from "./isComText"
import { Msg } from "./type"

type Props={
    index:number
    value:Msg
    isAnim:string
}

export default function Comment2(props:Props){
  return(
    <div className={props.isAnim}>
        <div className=" w-fit p-1 rounded font-bold stroke-shadow text-white text-xl bg-opacity-80 flex flex-row">
          <div className=' w-32 overflow-hidden overflow-ellipsis whitespace-nowrap'>{props.value.attr.handle}</div><div className='ml-1 w-[25rem] break-words'>「{ComText(props.value.ComText)}」</div>
        </div>
      </div>
  )
}