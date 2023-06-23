import React from 'react'

const Seats = ({index , step , columnStart , maxColumns , rowStart , maxRows , takenSeat , buyHandler }) => {

    
    return (

        <div
            onClick={() => buyHandler(index + step)}

            className={takenSeat.find(seat => Number(seat) == index + step) ? "occasion__seats--taken" : "occasion__seats"}

            style={{
                gridColumn: `${((index % maxColumns) + 1) + columnStart}`,
                gridRow: `${Math.ceil(((index + 1) / maxRows)) + rowStart}`

            }}

        >
            {index + step}

        </div>
        

    )
}

export default Seats