import {useState , useEffect} from 'react';

import {ethers} from 'ethers';

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

 
  const contractAddress = '0xa919cF1B688ccEb16552A5FeD4178137D7748433';

  const ABI = ContractAbi.abi;


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
      // else{

      //   alert("Connect To Metanmask With Connect Wallet Button");

      // }

    }
  }

  const getContractInstance = async() => {

    if(typeof ethereum != "undefined" && account != null){

  
    

        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = await provider.getSigner();

        const contract = new ethers.Contract(

            contractAddress,
            ABI,
            signer
      )

      console.log(contract , signer , provider);

    }

    setContract(contract);

    setProvider(provider);

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

    console.log(allEvents);

    setRegisteredEvents(allEvents);

    console.log(registeredEvents);


  }

  useEffect(() => {

    loadEvents();

  } , []);

 



  return (
    <>


      <NavBar account={account} 
        connectWallet={connectWallet}
        getConnectedAccounts={getConnectedAccounts}
        getContractInstance={getContractInstance}
       />

      <header>

      <h2 className='header__title'><strong>Event</strong> Tickets</h2>

      </header>

       <Sort account={account}/>

      <div className="cards">

        {

        account && registeredEvents.map((event , index) => (

          <Modal
          id={index + 1}
          event={event}
          contract={contract}
          provider={provider}
          account={account}
          toggle={toggle}
          setToggle={setToggle}
          setRegisteredEvents={setRegisteredEvents}
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


