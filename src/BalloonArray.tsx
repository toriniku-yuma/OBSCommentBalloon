import React, { useEffect, useRef, useState } from 'react';
import Comment from './Comment';
import { AnimatePresence } from 'framer-motion';
import Balloon from './Balloon';
import { Msg } from './type';
import { RandomGenProvider } from './randomGen';

type Props = {
   message:[Msg,number][]
}

export default function BalloonArray(props:Props){

      return(
        <div className={`App flex flex-row justify-between`}>
            <RandomGenProvider viewSize={[window.innerWidth -500,window.innerHeight -300]}
                                avoidBox={{x:500,y:0,width:600,height:600}}>
                <AnimatePresence>
                {props.message.map((value,index)=>{
                    return(
                        <Balloon
                        index={value[1]}
                        value={value[0]}
                        key={value[1]}
                        />
                    )
                })}
                </AnimatePresence>
            </RandomGenProvider>
        </div>
      )
}