import React from 'react';

import downIcon from '../assets/angle-down-solid.svg';

const Sort = () => {

    return (

        <div className="sort">
      <div className="sort__select">
        <p>Select Your Genre</p>
        <img src={downIcon} alt="Dropdown" />
      </div>

      <div className="sort__select">
        <p>Select Your Date</p>
        <img src={downIcon} alt="Dropdown" />
      </div>

      <div className="sort__select">
        <p>Select Your Price</p>
        <img src={downIcon} alt="Dropdown" />
      </div>
    </div>
  );


    
}

export default Sort