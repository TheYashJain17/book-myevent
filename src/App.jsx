import {useState , useEffect} from 'react';

import {ethers} from 'ethers';

import "react-toastify/dist/ReactToastify.css"

import {toast , ToastContainer} from "react-toastify";

import NavBar from '../src/Components/NavBar';

import Modal from '../src/Components/Modal';

import Sort from '../src/Components/Sort';

import SeatChart from '../src/Components/SeatChart';

import ContractAbi from '../src/artifacts/contracts/TicketOrganiser.sol/TicketOrganiser.json';


function App() {

  const [account , setAccount] = useState(null);

  const [contract, setContract ] = useState(null);

  const [provider , setProvider] = useState();

  const [registeredEvents , setRegisteredEvents] = useState([]);

  const [toggle , setToggle] = useState(false);

  const [event , setEvent] = useState({});

 
  const contractAddress = '0x8b0F5230Ba59D0eb1615396F53bFb868F3c2998A';

  const ABI = ContractAbi.abi;


  const connectWallet = async() => {

    if(ethereum){

      let accounts = await window.ethereum.request({method : "eth_requestAccounts"});

      setAccount(accounts[0]);

    }
    else{

      toast.warn("Please Install Metamask")

    }
  }

  const getConnectedAccounts = async() => {

    if(typeof window != "undefined" && typeof ethereum != "undefined"){

      let currentlyConnectedAccounts = await ethereum.request({method : "eth_accounts"});

      if(currentlyConnectedAccounts.length > 0){

        setAccount(currentlyConnectedAccounts[0]);

      }
      else{


        toast.warn("Connect To Metamask With Connect Wallet Button")

      }

    }
  }



  const loadEvents = async() => {


    const provider = new ethers.providers.Web3Provider(ethereum);
    
    setProvider(provider);

    const signer = await provider.getSigner();

    const contract = new ethers.Contract(

      contractAddress,
      ABI,
      signer

    )

  
    setContract(contract);


 

    const allEvents = await contract.getAllEvents();

    setRegisteredEvents(allEvents);



  }

  useEffect(() => {

    loadEvents();

  } , []);


  return (
    <>

    <ToastContainer/>



      <NavBar account={account} 
        connectWallet={connectWallet}
        getConnectedAccounts={getConnectedAccounts}
       />


      <header>

      <h2 className='header__title'><strong>Event</strong> Tickets</h2>

      </header>

       <Sort account={account}/>

      <div className="cards">

        {

        account && registeredEvents.map((registeredEvent , index) => (


          <Modal
          event={registeredEvent}
          toggle={toggle}
          setToggle={setToggle}
          setEvent={setEvent}
          key={index}

          />

          ))

        }      

      </div>

      {

        toggle && (

          <SeatChart

          setToggle={setToggle}
          provider={provider}
          contract={contract}
          event={event}

          />


        )


      }



    </>
  )
}

export default App


