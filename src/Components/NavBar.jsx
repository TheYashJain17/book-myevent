import React from 'react'

import { useEffect } from 'react';

const NavBar = ({account , getContractInstance , connectWallet , getConnectedAccounts}) => {

    useEffect(() => {

        window.ethereum.on("chainChanged" , (chainId) => {
    
          if(chainId != '0x13881'){
    
            alert("Please Move To Mumbai Polygon Network");
    
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
    
        getContractInstance();
    
    
      } , [account]);


  return (

    <nav>

    <div className="nav__brand">

        <h1>BookMyEvent</h1>

        <input className='nav__search' type="text" placeholder='Find Millions Of Events' />

        <ul className='nav__links'>

        <li><a href='/'>Concerts</a></li>
        <li><a href='/'>Sports</a></li>
        <li><a href='/'>Educational</a></li>
        <li><a href='/'>Games</a></li>
        <li><a href='/'>More</a></li>

        </ul>
    </div>

    {

        account ? (<button type='button' className='nav__connect'>
        
        {account.slice(0,6) + "..." + account.slice(39)}
        
        </button>)

        :


        (<button type='button' className='nav__connect' onClick={connectWallet}>Connect Wallet</button>)


    }



    </nav>

)
}

export default NavBar