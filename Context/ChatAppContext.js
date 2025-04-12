import React,{useState,useEffect} from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT 
import { 
    CheckIfWalletConnected,
    connectWallet, 
    connectingWithContract 
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();


export const ChatAppProvider = ({children}) =>{

    //USESTATE
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendList, setfriendList] = useState("");
    const [friendMsg, setfriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setuserLists] = useState([]);
    const [error, setError] = useState("");

    //CHAT USER DATA
    const [currentUserName, setcurrentUserName] = useState("");
    const [currentUserAddress, setcurrentUserAddress] = useState("");

    const router = useRouter();

    // FETCH DATA TIME OF PAGE LOAD
    const fetchData = async() =>{
        try{
            // GET CONTRACT
            const contract = await connectingWithContract();

            // GET ACCOUNT
            const connectAccount = await connectWallet();
            setAccount(connectAccount);

            // GET USER NAME
            const userName = await contract.getUsernchatame(connectAccount);
            setUserName(userName); 

            // GET MY FRIENDLIST
            const friendList = await contract.getMyFriendList(); 
            setfriendList(friendList);

            //GET ALL APP USER LIST
            const userList = await contract.getAllAppUser();
            setuserLists(userList);

        }catch(error){
            // setError("Please install and connect your wallet");
        }
    };

    useEffect(() =>{
        fetchData();
    },[]);

    const readMessage = async(friendAddress)=>{
        try{
            const contract = await connectingWithContract();
            const read = await contract.getMessage(friendAddress);
            setfriendMsg(read);
        }catch(error){
            console.log("Currently you have no message");
        }
    };

    // CREATE ACCOUNT
    const createAccount = async({name, accountAddress}) =>{
        try{
            if(name || accountAddress) return setError("name and account address cantnot be empty");
            const contract = await connectingWithContract();
            const getcreatedUser = await contract.createAccount(name);
            setLoading(true);   
            await getcreatedUser.wait();
            setLoading(false);
            window.location.reload();
        }catch(error){
            setError("Error while creating your account please reload the browser");
        }
    };

    // ADD YOUR FRIEND
    const addFriends = async({name, accountAddress}) => {
        try{
            if(name || accountAddress) return setError("Please provide data");

            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push('/');
            window.location.reload();
        }catch(error){
            setError("Something get wrong while adding friends, try again")
        }
    };

    // SEND MESSAGE TO YOUR FRIEND
    const sendMessage = async({msg,address})=>{
        try{
            if(msg || address) return setError("Please Type your Message");

            const contract = contract.connectingWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();

        }catch(error){
            setError("Please reload and try again");
        }
    };

    // READ INFO
    const readUser = async(userAddress)=>{
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setcurrentUserName(userName);
        setcurrentUserAddress(userAddress);
    }
    

    return (
    
        <ChatAppContext.Provider 
        value={{
            readMessage,
            createAccount,
            addFriends,
            sendMessage,
            readUser,
            connectWallet,
            CheckIfWalletConnected,
            account,
            userName,
            friendList,
            friendMsg,
            loading,
            userLists,
            error,
            currentUserName,
            currentUserAddress
            }}
        >
            {children}
        </ChatAppContext.Provider>
    );
};