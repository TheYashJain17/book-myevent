import hre from "hardhat";

import { configDotenv } from "dotenv"; //we can use this statement when we cannot use require, simply import this

configDotenv(); //and then run this as function , and it will do the same job as require('dotenv).config();

async function main(){

  // const deployer = process.env.PUBLIC_KEY;


  const [deployer] = await ethers.getSigners(); //This will help us to get the account from which we have deployed the contract , this method returns the array of object therefore we have put the deployer variabele imside array. So always use this method to get the deployer address. 

  const TicketOrganiser = await hre.ethers.getContractFactory('TicketOrganiser');

  const contract = await TicketOrganiser.deploy("BookMyEvent" , "BME");

  await contract.deployed();

  console.log(

    `The Address Of The Contract is ${contract.address}`

  );

  const Events = [

    {
    
     name: "Blockchain Seminar",
     cost : ethers.utils.parseEther('0.01'),
     totalTickets :  50,
     date : "August 22",
     time : "5:00PM IST",
     location : "Noida Stadium Complex , Noida"
      
    },
    {
    
     name: "World Cup Final",
     cost : ethers.utils.parseEther('0.02'),
     totalTickets :  100,
     date : "September 15",
     time : "7:00PM IST",
     location : "Eden Gardens, Kolkata"
      
    },
    {
    
     name: "WWE Live Event",
     cost : ethers.utils.parseEther('0.04'),
     totalTickets :  0,
     date : "October 26",
     time : "2:00PM IST",
     location : "Indira Gandhi Stadium  , Delhi"
      
    },
    {
    
     name: "Arijit Singh Concert",
     cost : ethers.utils.parseEther('0.03'),
     totalTickets :  30,
     date : "November 17",
     time : "9:00PM IST",
     location : "DY Patil Stadium , Mumbai"
      
    },
    {
    
     name: "Common Wealth Game",
     cost : ethers.utils.parseEther('0.05'),
     totalTickets :  10,
     date : "December 31",
     time : "10:00AM IST",
     location : "Jawaharlal Nehru Stadium , Delhi"
      
    },
    
  ]
    
    for(let i = 0; i < 5; i++){
    
    const transaction = await contract.connect(deployer).createEvent(
    
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

// The Address Of The Contract is 0xa919cF1B688ccEb16552A5FeD4178137D7748433

