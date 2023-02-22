import React, { useEffect, useRef, useState } from 'react';
import configData from "./config.json";
import Comment from './Comment';
import { AnimatePresence } from 'framer-motion';
import Balloon from './Balloon';
import { Msg } from './type';

type Props = {
    message:[Msg,number][]
}

export default function BalloonArray(props:Props){

      return(
        <div className={`App flex flex-row justify-between`}>
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
        </div>
      )
}