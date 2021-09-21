import React, { useState,useEffect } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';

 export const EventHangouts =()=>{
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

     const sendData = ()=>{
         var user_id;
         var name=document.getElementById("myName").value;

         fetch("http://localhost:4449/setUsers?name="+name)
             .then(res => res.json())
             .then(
                 (result) => {
                     user_id=result[0].id;
                     opt.map((Id) => {
                         var res = fetch("http://localhost:4449/setEvents?eventDate_id=" + Id + "&user_id=" + user_id)
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
         fetch("http://localhost:4449/getUsers")
             .then(res => res.json())
             .then(
                 (result) => {
                     setIsLoaded(false);
                     setItems(result);
                     fetch("http://localhost:4449/getEventDates")
                         .then(res => res.json())
                         .then(
                             (result) => {
                                 setIsLoaded(false);
                                 setDates(result);
                                 fetch("http://localhost:4449/getEvents")
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
                    <label>Name:</label>
                    <input type="text" id="myName"/>
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
                        <tr>
                            <td></td>
                            {
                                dates.map(date=> (
                                    <td key={date.id}><input type="checkbox" onChange={(e)=>{
                                        setChk(e,date.id)
                                    }} /></td>
                                ))
                            }
                        </tr>
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
                    <Link to="/hangoutList" onClick={sendData}>Done</Link>
                </div>
            );
        }
}
