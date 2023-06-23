import React, { useEffect, useState } from 'react';

import {ethers} from 'ethers';

import Seats from './Seats';

import close from '../assets/close-button.svg';

const SeatChart = ({event , contract , provider , setToggle}) => {
    
    const [takenSeat , setTakenSeat] = useState(false);

    const [soldSeat , setSoldSeat] = useState(false)


const getTakenSeats = async() => {


    const takenSeats = await contract.takenSeatsList(event.id);

    setTakenSeat(takenSeats);

}

const buyHandler = async(_seat) => {

  setSoldSeat(false);

  console.log("We Are in the function");

  console.log(`This is our eventId ${event.Id}`);

  console.log(`This is our seat ${_seat}`)

    try {

    const signer  = await provider.getSigner();

    const buyTransaction = await contract.connect(signer).buyTickets(event.Id , _seat , {value : event.cost});

    await buyTransaction.wait();

    console.log("Transaction is done");

    setSoldSeat(true);
      
    } catch (error) {

      if(error.name == "Id Doesnt exist" ||   error.message == 'Internal JSON-RPC error.'){

          alert("Please Enter a valid id")

      }

     
      
    }

}

useEffect(() => {

    getTakenSeats();

} , [soldSeat]);

return (
    <div className="occasion">
      
      <div className="occasion__seating">
      
        <h1>{event.name} Seating Map</h1>

        <button onClick={() => setToggle(false)} className="occasion__close">
          
          <img src={close} alt="Close" />

        </button>

        <div className="occasion__stage">

          <strong>STAGE</strong>

        </div>

        {takenSeat && Array(25).fill(1).map((element, index) =>
          <Seats
            index={index}
            step={1}
            columnStart={0}
            maxColumns={5}
            rowStart={2}
            maxRows={5}
            takenSeat={takenSeat}
            buyHandler={buyHandler}
            key={index}
          />
        )}

        <div className="occasion__spacer--1 ">

          <strong>WALKWAY</strong>

        </div>

        {takenSeat && Array(Number(event.totalTickets) - 50).fill(1).map((element, index) =>

          <Seats
            index={index}
            step={26}
            columnStart={6}
            maxColumns={15}
            rowStart={2}
            maxRows={15}
            takenSeat={takenSeat}
            buyHandler={buyHandler}
            key={index}
          />
        )}

        <div className="occasion__spacer--2">
        
          <strong>WALKWAY</strong>

        </div>

        {takenSeat && Array(25).fill(1).map((element , index) =>

          <Seats
            index={Number(index)}
            step={(Number(event.totalTickets) - 24)}
            columnStart={22}
            maxColumns={5}
            rowStart={2}
            maxRows={5}
            takenSeat={takenSeat}
            buyHandler={buyHandler}
            key={index}
          />
        )}
      </div>
    </div >
  );

}

export default SeatChart