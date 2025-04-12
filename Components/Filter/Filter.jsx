import React,{useState, useContext} from 'react';
import Image from 'next/image';

import Style from './Filter.module.css';
import images from '../../assets';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Model } from '../index'; 

const Filter = () => {

  const {account, addFriends} = useContext(ChatAppContext);
  // Usestate
  const [addFriend, setAddFriend] = useState(false);
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20}/>
            <input type="text" placeholder="search.."/>
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20}/>
            CLAER CHAT
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="clear" width={20} height={20}/>
            ADD FRIEND
          </button>
        </div>
      </div>
       
      // Model Component
      {addFriend &&(
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, voluptate temporibus! Cupiditate animi quae distinctio. Explicabo quia natus, quas quaerat sit animi, aliquam ipsum aliquid tenetur magnam nesciunt qui sequi!"
            smallInfo="Kindley Select Your Friend Name and Address.."
            image={images.hero}
            functionName={addFriends}
          />
        </div>

      )}
    </div>
  );
};

export default Filter;
