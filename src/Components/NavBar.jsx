import React from 'react'

import { useEffect } from 'react';

import bookmyevent from '../assets/BookMyEvent.svg'

import "react-toastify/dist/ReactToastify.css"

import {toast , ToastContainer} from "react-toastify";

const NavBar = ({account , connectWallet , getConnectedAccounts}) => {


  const checkForPolygonNetwork = async() => {

    const chainId = await window.ethereum.request({method : "eth_chainId"});

    // console.log(chainId);

    const polygonChainId = '0x13881';

    if(chainId != polygonChainId){

      alert("Please Move To Mumbai Polygon Network");

      // toast.warn("Please Move To Mumbai Polygon Network");

      try {
        
        await window.ethereum.request({

          method : "wallet_switchEthereumChain",
          params : [{chainId : polygonChainId}]

        })

        // alert("Network has been switched to mumbai polygon successfully");

        // toast.success("Network Has Been Switched To Mumbai Polygon");

      } catch (error) {

        if(error.code == 4902){

          // alert("This is network is not available in your metamask , Please Add It");

          toast.error("This Network Is Not Available On Your Metamask , Please Add It");

        }
        else{

          // alert("Failed To Switch To The Network , Some Error Occured");

          toast.error("Failed To Switch To The Network , Some Error Occured");

          // console.log(error.reason)

        }

     

    }
    

  }


}


    useEffect(() => {

        window.ethereum.on("chainChanged" , (chainId) => {
    
          if(chainId != '0x13881' && account != null){ 
                
            // toast.warn("Please Move To Mumbai Polygon Network");

            checkForPolygonNetwork();
    
          }
          else{
    
            window.location.reload();
    
          }
    
        });
    
        window.ethereum.on("accountsChanged" , (accounts) => {
    
          window.location.reload();
    
          setAccount(accounts[0]);

    
        });
    
    
        getConnectedAccounts();
    
      account && checkForPolygonNetwork();

    
      } , [account]);


  return (

    <>

    <nav>

    <div className="nav__brand">

        <a href="/"><img  src={bookmyevent} alt="BME"/></a>  

        <h1><a href="/">BookMyEvent</a></h1>

        <input className='nav__search' type="text" placeholder='Find Millions Of Events' />

        <ul className='nav__links'>

        <li><a href='/'>Concerts</a></li>
        <li><a href='/'>Sports</a></li>
        <li><a href='/'>Educational</a></li>
        <li><a href='/'>Games</a></li>
        <li><a href='/'>More</a></li>

        </ul>
    </div>

    </nav>

  <div className='notconnectedbtn'>


  {

    account ? (<button type='button' className='nav__connect'>

    {account.slice(0,6) + "..." + account.slice(39)}

      </button>)

      :

  (<button type='button' className='notconnected' onClick={connectWallet}>Connect Wallet</button>)


}

  </div>

  <ToastContainer/>


  </>


  )

}

export default NavBar