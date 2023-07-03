import React from 'react'

import { useEffect } from 'react';

import bookmyevent from '../assets/BookMyEvent.svg'

import "react-toastify/dist/ReactToastify.css"

import {toast , ToastContainer} from "react-toastify";

const NavBar = ({account , connectWallet , getConnectedAccounts}) => {


  const checkForPolygonNetwork = async() => {

    const chainId = await window.ethereum.request({method : "eth_chainId"});

    const polygonChainId = '0x13881';

    if(chainId != polygonChainId){

      alert("Please Move To Mumbai Polygon Network");

      try {
        
        await window.ethereum.request({

          method : "wallet_switchEthereumChain",
          params : [{chainId : polygonChainId}]

        })


      } catch (error) {

        if(error.code == 4902){

          toast.error("This Network Is Not Available On Your Metamask , Please Add It");

        }
        else{

          toast.error("Failed To Switch To The Network , Some Error Occured");

        }

     

    }
    
  }

}

  const checkOnChanges = () => {

    window.ethereum.on("chainChanged" , (chainId) => {
    
      if(chainId != '0x13881' && account != null){ 
            
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

  }


    useEffect(() => {

      checkOnChanges();

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