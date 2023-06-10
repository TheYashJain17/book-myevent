import { useEffect , useState} from 'react';

/*import Navigattion from '../src/Components/Navigation';

import Sort from '../src/Components/Sort';

import Card from '../src/Components/Card';

import SeatChart from '../src/Components/SeatChart';*/

function App() {

  const [account , setAccount] = useState(null);

  const {ethereum} = window;

  const connectWallet = async() => {

    if(ethereum){

      let accounts = await window.ethereum.request({method : "eth_requestAccounts"});

      setAccount(accounts[0]);

    }
    else{

      alert("Please Install Metamask");

    }
  }

  const getConnectedAccounts = async() => {

    if(typeof window != "undefined" && typeof ethereum != "undefined"){

      let currentlyConnectedAccounts = await ethereum.request({method : "eth_accounts"});

      if(currentlyConnectedAccounts.length > 0){

        setAccount(currentlyConnectedAccounts[0]);

      }
      else{

        alert("Connect To Metanmask With Connect Wallet Button");

      }

    }
  }

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


  } , [account])

  return (
    <>
      
     <h1>GoodBye World</h1> 

     <button onClick={connectWallet}>Connect Wallet</button>

      <h2>{account}</h2> 


    </>
  )
}

export default App
