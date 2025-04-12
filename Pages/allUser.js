import React,{useState, useEffect, useContext}from 'react';

import { UserCard } from '../Components/index';
import style from "../styles/allUser.module.css";
import { ChatAppContext } from '../Context/ChatAppContext';

const allUser = () => {
    const {userLists, addFriends} = useContext(ChatAppContext)
  return (
    <div>
        <div className={style.allUser_info}>
            <h1>
              Find Your Friends
            </h1>
        </div>
        <div className={style.allUser}>
          {userLists.map((el, i)=>(
            <UserCard key={i + 1} el={el} i={i} addFriends={addFriends}/>
          ))}
        </div>
    </div>
  ); 
}

export default allUser