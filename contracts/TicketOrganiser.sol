//SPDX-License-Identifier:MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TicketOrganiser is ERC721 {

    struct Event{

        uint256 id;
        string name;
        uint256 cost;
        uint256 totalTickets;
        string date;
        string time;
        string location;

    }

    address public owner;

    uint256 public eventId;

    uint256 public totalSupply;

    mapping(uint256 => Event) EventDetails;

    mapping(uint256 => mapping(uint256 => address)) seatTakenBy;

    mapping(uint256 => uint256[]) takenSeats;

    mapping(uint256 => mapping(address => bool)) isBought;

    Event[] allEvents;

    constructor(string memory _name , string memory _symbol) ERC721(_name , _symbol){

        owner = msg.sender;

    }

    modifier onlyOwner(){

        require(msg.sender == owner,"Only owner can call this function");

        _;

    }

function createEvent(string memory _name , uint256 _cost , uint256 _totalTickets , string memory _date , string memory _time , string memory _location) onlyOwner external {

    eventId++;

    Event memory _event = EventDetails[eventId];

    _event.id = eventId;
    _event.name = _name;
    _event.cost = _cost;
    _event.totalTickets = _totalTickets;
    _event.date = _date;
    _event.time = _time;
    _event.location = _location;

    allEvents.push(_event);


}

function getEvent(uint256 _id) view external returns

(
    uint256,
    string memory,
    uint256,
    uint256,
    string memory,
    string memory,
    string memory
)
{

    return(
        EventDetails[_id].id,     
        EventDetails[_id].name,  
        EventDetails[_id].cost,
        EventDetails[_id].totalTickets,
        EventDetails[_id].date,
        EventDetails[_id].time,
        EventDetails[_id].location

    );

}

function getAllEvents() view external returns(Event[] memory){

    return allEvents;

}


function buyTickets(uint256 _id , uint256 _seat) payable external{

    require(_id != 0 ,"This id doesnt exist");

    require(msg.value == EventDetails[_id].cost , "Amount should be equal to the price of the ticket");

    require(totalSupply >= _id , "Id Doesnt exist");

    require(seatTakenBy[_id][_seat] == address(0) , "This seat has been already taken");

    require(EventDetails[_id].totalTickets >= _seat , "Seats are full now");

    seatTakenBy[_id][_seat] = msg.sender;

    EventDetails[_id].totalTickets -= 1;

    takenSeats[_id].push(_seat);

    totalSupply++;

    isBought[_id][msg.sender] = true;

    _safeMint(msg.sender, totalSupply);

}

function takenSeatsList(uint256 _id) view external returns(uint256[] memory){

    return takenSeats[_id];

}

function withdrawBalance() onlyOwner external {

    payable(msg.sender).transfer(address(this).balance);

}

}

