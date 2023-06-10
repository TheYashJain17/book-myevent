import { useEffect , useState} from 'react';

/*import Navigattion from '../src/Components/Navigation';

import Sort from '../src/Components/Sort';

import Card from '../src/Components/Card';

import SeatChart from '../src/Components/SeatChart';*/

import ContractAbi from '../src/artifacts/contracts/TicketOrganiser.sol/TicketOrganiser.json';

function App() {

  const [account , setAccount] = useState(null);

  const [contract, setContract ] = useState(null);

  const [provider , setProvider] = useState(null);

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

  const getContractInstance = async() => {

    if(typeof ethereum != "undefined" && account != null){

        const contractAddress = '0xa919cF1B688ccEb16552A5FeD4178137D7748433';

        const ABI = ContractAbi.abi;

        const provider = await ethers.providers.Web3Provider(ethereum);

        const signer = await provider.getSigner();

        const contract = await ethers.Contract(

            contractAddress,
            ABI,
            signer
      )

      setContract(contract);

      setProvider(provider);

      console.log(contract , signer);


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

    getContractInstance();


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
