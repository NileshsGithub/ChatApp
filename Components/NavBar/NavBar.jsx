import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

// INTERNAL IMPORT
import style from "./NavBar.module.css";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model, Error} from "../index";
import images from "../../assets";

const NavBar = () => {
  const menuItems = [
    {
      menu: "All users",
      link: "alluser",
    },
    {
      menu: "CHAT",
      link: "/",
    },
    {
      menu: "CONTACT",
      link: "/",
    },
    {
      menu: "SETTING",
      link: "/",
    },
    {
      menu: "FAQS",
      link: "/",
    },
    {
      menu: "TERMS OF USE",
      link: "alluser",
    },
  ];

  //USESTATES
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error} =
   useContext(ChatAppContext);

  return (
    <div className={style.NavBar}>
      <div className={style.NavBar_box}>
        <div className={style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={style.NavBar_box_right}>
          {/* //DESKTOP */}
          <div className={style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${style.NavBar_box_right_menu_items}${
                  active == i + 1 ? style.active_btn : ""
                }`}
              >
                <Link
                  className={style.NavBar_box_right_menu_items_link}
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>

          {/* //MOBILE */}
          {open && (
            <div className={style.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  class={`${style.mobile_menu_items}
               ${active == i + 1 ? style.active_btn : ""}`}
                >
                  <Link className={style.mobile_menu_items_link} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              ))}
              <p className={style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}

          {/* // CONNECT WALLET */}
          <div className={style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() =>setOpenModel(true)}>
        
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />
              
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>

          <div
            className={style.NavBar_box_right_open}
            onClick={() => setOpen(true)}  
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>

      {/* MODEL COMPONENT */}
      {openModel && (
        <div className={style.modelBox}>
          <Model 
            openBox={setOpenModel}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam incidunt saepe accusantium quasi optio illo dignissimos nobis, beatae eligendi architecto error quibusdam commodi delectus eos, quos, nesciunt ipsa ipsum quam!"
            smallInfo="Kindley select your name..."
            image={images.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
        
      )}  
      {error == "" ? "" : <Error error={error}/>}
    </div>
  );
};

export default NavBar;
