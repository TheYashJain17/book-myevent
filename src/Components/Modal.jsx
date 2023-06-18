import {ethers} from 'ethers'

import React from 'react'

const Modal = ({event , provider , contract , account , setToggle , setRegisteredEvents , toggle}) => {

  const toggler = () => {

    setRegisteredEvents(event);

    toggle ? setToggle(false) : setToggle(true)

  }

  return (

    <div className="card">

    <div className="card__info">

    <p className="card__date">

    <strong>{event.date}</strong><br />{event.time}

    </p>

    <h3 className="card__name">

    {event.name}

    </h3>

    <p className="card__location">

    <small>{event.location}</small>

    </p>

    <p className="card__cost">

      <strong>

      {/* {event.cost} */}

      {ethers.utils.formatUnits(event.cost.toString() , "ether")}


        
      </strong>

      ETH

    </p>

    {event.totalTickets.toString() === "0" ? (

        <button className="card__button--out" type='button' disabled>SOLD OUT</button>)

      :

      (<button className="card__button" type='button' onClick={() => toggler()}>View Seats</button>)

    }
    
    </div>

    <hr />

    </div>


  )
}

export default Modal