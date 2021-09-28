import React, { useState,useEffect } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';
import {hangout_store} from '../hangout_store';

export const HangoutList =()=>{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [dates, setDates] = useState([]);
    const [events, setEvents] = useState([]);
    const opt =[];

    const chkValue = (userId,dateId)=>{
        console.log(events);
        var setChk=false;
        events.map(event => {
            if (event.eventDate_id === dateId && userId === event.user_id){
                setChk= true;
            }
        })
        return setChk;
    }

    const getFinalDate = ()=>{
        hangout_store.finalDate=document.getElementById("finalDate").value;
    }

    const sendData = ()=>{
        var user_id;
        var name=document.getElementById("myName").value;
        fetch("https://apites1.herokuapp.com/setUsers?name="+name)
            .then(res => res.json())
            .then(
                (result) => {
                    user_id=result[0].id;
                    opt.map((Id) => {
                        var res = fetch("https://apites1.herokuapp.com/setEvents?eventDate_id=" + Id + "&user_id=" + user_id)
                        console.log(res);
                    })
                })
    }

    function setChk(event,Id) {
        let index
        if (event.target.checked) {
            opt.push(Id)
        } else {
            index = opt.indexOf(Id)
            opt.splice(index, 1)
        }
    }
    useEffect(() => {
        fetch("https://apites1.herokuapp.com/getUsers")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(false);
                    setItems(result);
                    fetch("https://apites1.herokuapp.com/getEventDates")
                        .then(res => res.json())
                        .then(
                            (result) => {
                                setIsLoaded(false);
                                setDates(result);
                                fetch("https://apites1.herokuapp.com/getEvents")
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setEvents(result);
                                            setIsLoaded(true);
                                        })
                            })
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <p>This is the description of the hangout.</p>

                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        {
                            dates.map(date=> (
                                <th key={date.id}>{date.eventDate} {date.eventTime}</th>
                            ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map(item=> (
                            <tr key={item.id}>
                                <td>{item.Name}</td>
                                {dates.map(date=>(
                                    <td key={date.id}><input type="checkbox" checked={
                                        chkValue(item.id,date.id)
                                    } disabled={true}/></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Select the date for hangouts:</p>
                <select id="finalDate" onChange={getFinalDate}>
                    <option selected={true}>
                        ---Select----
                    </option>
                    {dates.map(date=>(
                        <option key={date.id}>
                            {date.eventDate} {date.eventTime}
                        </option>
                    ))}
                </select><br/>
                <Link to="/finalResult">Done</Link>
            </div>
        );
    }
}
