import React,{useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';


import Style from "./Card.module.css";
import images from "../../../assets";


const Card = ({readMessage, el, i, readUser }) => {
  return (
    <Link href={{pathname: '/',
         query: { name: `${el.name}`, address:`${el.pubkey}`},
        }}
    >
        <div 
         className={Style.Card} 
         onclick={()=>(readMessage(el.pubkey),readUser(el.pubkey))}
        >
            <div className={Style.Card_box}>\
                <div className={Style.Card_box_left}>
                    <Image src={images.accountName}
                      alt="username"
                      width={50}
                      height={50}
                    />
                </div>
                <div className={Style.Card_box_right}></div>
                <div className={Style.Card_box_right_middle}>
                    <h4>{el.name}</h4>
                    <p>{el.pubkey.slice(21)}..</p>
                </div>
                <div className={Style.Card_box_right_end}>
                    <small>{i + 1}</small>
                </div>
            </div>  
        </div>
    </Link>
  )
}

export default Card