import { useState } from "react"
import ComText from "./isComText"
import { Msg } from "./type"

type Props={
    index:number
    value:Msg
    isAnim:string
}

export default function Comment(props:Props){
  return(
    <div className={props.isAnim}>
      <div className=' bg-white p-1 m-1 rounded bg-opacity-80 w-fit shadow-lg'>
        <div className=" bg-blue-400 w-fit p-1 rounded font-bold stroke-shadow text-white text-xl bg-opacity-80 flex flex-row">
          <div className=' w-32 overflow-hidden overflow-ellipsis whitespace-nowrap'>{props.value.attr.handle}</div><div className='ml-1 w-[25rem] break-words'>「{ComText(props.value.ComText)}」</div>
        </div>
      </div>
    </div>
  )
}