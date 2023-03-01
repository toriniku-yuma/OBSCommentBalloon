import React, { useEffect, useRef, useState } from 'react';
import configData from "./config.json";
import Comment from './Comment';
import { Msg } from './type';
import Comment2 from './Comment2';

type Props = {
    message:[Msg,number][]
}

export default function CommentArray(props:Props){
    let commentArray:[Msg, number][]  = [];
    let isAnim:string;
    let isLeft = "";
  
    if(configData.isAnim === "right"){
      isAnim = "animate-slide-in-right";
    }else if(configData.isAnim === "left"){
      isAnim = "animate-slide-in-left";
      isLeft = "ml-auto";
    }else{
      console.error("config anim error")
    }

    if(configData.isScroll === "top"){
        commentArray = props.message;
        console.log(commentArray)
    }else if(configData.isScroll === "bottom"){
        commentArray = [...props.message].reverse();
        console.log(commentArray)
    }

      return(
        <div className={`App flex flex-row justify-between`}>
            <div className={` ${isLeft}`}>
                {commentArray.map((value,index)=>{
                  if(configData.isComponent === "Comment1"){
                    return(
                        <Comment
                        index={index}
                        value={value[0]}
                        isAnim={isAnim}
                        key={value[1]}
                        />
                    )
                    }else if(configData.isComponent === "Comment2"){
                      return(
                        <Comment2
                        index={index}
                        value={value[0]}
                        isAnim={isAnim}
                        key={value[1]}/>
                      )
                    }
                })}
            </div>
        </div>
      )
}