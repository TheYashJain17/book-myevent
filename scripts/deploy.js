import hre from "hardhat";

import { configDotenv } from "dotenv";

configDotenv();

async function main(){

  const deployer = process.env.PRIVATE_KEY;

  const TicketOrganiser = await hre.ethers.getContractFactory('TicketOrganiser');

  const contract = await TicketOrganiser.deploy("BookMyEvent" , "BME");

  await contract.deployed();

  console.log(

    `The Address Of The Contract is ${contract.address}`

  );

  const Events = [

    {
    
     name: "Blockchain Seminar",
     cost : tokens(0.0001),
     totalTickets :  50,
     date : "August 22",
     time : "5:00PM IST",
     location : "Noida Stadium Complex , Noida"
      
    },
    {
    
     name: "World Cup Final",
     cost : tokens(0.001),
     totalTickets :  100,
     date : "September 15",
     time : "7:00PM IST",
     location : "Eden Gardens, Kolkata"
      
    },
    {
    
     name: "WWE Live Event",
     cost : tokens(0.004),
     totalTickets :  0,
     date : "October 26",
     time : "2:00PM IST",
     location : "Indira Gandhi Stadium  , Delhi"
      
    },
    {
    
     name: "Arijit Singh Concert",
     cost : tokens(0.0002),
     totalTickets :  30,
     date : "November 17",
     time : "9:00PM IST",
     location : "DY Patil Stadium , Mumbai"
      
    },
    {
    
     name: "Common Wealth Game",
     cost : tokens(0.01),
     totalTickets :  10,
     date : "December 31",
     time : "10:00AM IST",
     location : "Jawaharlal Nehru Stadium , Delhi"
      
    },
    
  ]
    
    for(let i = 0; i < 5; i++){
    
    const transaction = await TicketOrganiser.connect(deployer).createEvent(
    
        Events[i].name,
        Events[i].cost,
        Events[i].totalTickets,
        Events[i].date,
        Events[i].time,
        Events[i].location,
    ) 
    
    await transaction.wait();
    
    console.log(
    
      `Created Events Are ${i + 1} : ${Events[i].name}`
    
    )
    
  }

}

main().catch((error) => {

  console.log(error);

  process.exitCode = 1;

})

