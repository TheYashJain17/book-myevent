import React, { useState } from 'react'

import { useEffect } from 'react';

import bookmyevent from '../assets/BookMyEvent.svg'

import "react-toastify/dist/ReactToastify.css"

import {toast , ToastContainer} from "react-toastify";

const NavBar = ({account , connectWallet , getConnectedAccounts}) => {

  const [chainId , setChainId] = useState(false);

  const checkChainId = async() => {

    const chainId = await window.ethereum.request({method : "eth_chainId"});

    const polygonChainId = '0x13881';

    if(chainId == polygonChainId){

      setChainId(true);

    }
    else{

      toast.warn("Please Change Your Network To Mumbai With Change Network Button").wait();


    }

  }

  const checkForPolygonNetwork = async() => {

    const polygonChainId = '0x13881';

      try {
        
        await window.ethereum.request({

          method : "wallet_switchEthereumChain",
          params : [{chainId : polygonChainId}]

        })

        setChainId(true);


      } catch (error) {

        if(error.code == 4902){

          toast.error("This Network Is Not Available On Your Metamask , Please Add It");

        }
        else{

          toast.error("Failed To Switch To The Network , Some Error Occured");

        }

  }

}

  const checkOnChanges = () => {

    window.ethereum.on("chainChanged" , (chainId) => {
    
      if(chainId != '0x13881' && account != null){ 
            
        setChainId(false)

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

      account && checkChainId();
    
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

  <div>


  {

    account ? (<button type='button' className='nav__connect'>

    {account.slice(0,6) + "..." + account.slice(39)}

      </button>)

      :

  (<button type='button' className='notconnected' onClick={connectWallet}>Connect Wallet</button>)


}

  </div>

  <div className='networkdiv'>


  {

    !chainId && account ? 

    (<button className='networkbtn' onClick={checkForPolygonNetwork}>Change Network</button>)
    :
    ("")

  }

  </div>


  <ToastContainer/>


  </>


  )

}

export default NavBar