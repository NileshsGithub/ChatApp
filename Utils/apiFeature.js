import { ethers, N } from "ethers";
import Web3modal from "web3modal";

import { ChatAppAddress,ChatAppABI } from "../Context/constants";

export const CheckIfWalletConnected = async() =>{
    try{
        if(window.ethereum)return console.log("Install MateMask");

        const accounts= await window.ethereum.request({
            method:"eth_accounts"
        });

        const firstAccount = accounts[0];
        return firstAccount;
    }catch(error){
        console.log(error)
    }    
}

export const connectWallet = async()=>{
    try{
         if(window.ethereum)return console.log("Install MateMask");

        const accounts= await window.ethereum.request({
            method:"eth_requestAccounts"
    });

    const firstAccount = accounts[0];
    return firstAccount;

    }catch(error){
            console.log(error);
    }
}

const fetchContract = (signarOrProvider) => 
    new ethers.Contract(ChatAppABI, ChatAppAddress, signarOrProvider);  


export const conectingWithContract = async() =>{
    try{
        const web3modal = new web3modal();
        const connection = await web3modal.connect();
        const provider = new ethers.provider.wed3Provider(connection);
        const signer = provider.getSigner();
        const contract = = fetchContract(signer);

        return contract;
    }catch(error){
        console.log(error);
    }
}

export const converTime = (time) =>{
    const newTime = new Date(time.toNumber());

    const realTime = 
    newTime.getHours() + 
    "/" + 
    newTime.getMinutes() +
    "/" + 
    newTime.getSeconds() +
    " Date:" +
    newTime.getDate() +
    "/" + 
    (newTime.getMonth() +1) +
    "/" +
    newTime.getFullYear();

    return realTime;
}