import React, { useEffect, useRef, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import configData from './config';
import "./index.css";
import Comment from './Comment';

type Msg = {
  attr:{
      handle:string
  }
  ComText:string
}

function App() {
  const [commentArray,setCommentArray] = useState<(Msg|number|any)[]>([]);
  const socketRef = useRef<ReconnectingWebSocket>();
  let keyCounter = 0;

  useEffect(()=>{
    const websocket = new ReconnectingWebSocket("ws://localhost:" + configData.port);
    socketRef.current = websocket;

    const onMessage = (e:MessageEvent<string>)=>{
      if (configData.isScroll === "top"){
        setCommentArray((commentArray) => {
          const newCommentArray = commentArray.filter((comment,index) => index<configData.viewCount);
          keyCounter = keyCounter + 1;
          return [[JSON.parse(e.data),keyCounter,0],...newCommentArray]
        });
      }else if(configData.isScroll === "bottom"){
        setCommentArray((commentArray) => {
          const newCommentArray:Msg[] = [];
          let commentLength;
          commentArray.forEach((value,index) => {
            keyCounter = keyCounter + 1;
            if(index>=configData.viewCount){
              newCommentArray.shift();
              newCommentArray.push(value);
              commentLength = commentArray.length -1;
            }else{
              newCommentArray.push(value);
              commentLength = commentArray.length;
            }            
          });
          return [...newCommentArray,[JSON.parse(e.data),keyCounter,commentLength]]
        }); 
      }else{
        console.error("error")
      }
    }
    websocket.addEventListener("message",onMessage)

    return()=>{
      websocket.close();
      websocket.removeEventListener("message",onMessage);
    }
  },[])

  return (
    <div className="App">
      <div className='m-10'>test</div>
      {commentArray.map((value,index)=>{
          return(
            <Comment
            index={index}
            value={value[0]}
            animScroll={value[2]}
            key={value[1]}/>
          )
      })}
    </div>
  );
}

export default App;
