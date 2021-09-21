import React from 'react';
import './NewHangouts.css';
import {Link} from 'react-router-dom';

export const NewHangouts = () => {
    var i=1;
    const addEventDates = () => {
        debugger;
        while(i>0){
             debugger;
             var dateValue= new Date(document.querySelectorAll('#hangoutSchedule'+i+' input[type="date"]')[0].value);
             var timeValue=document.querySelectorAll('#hangoutSchedule'+i+' input[type="time"]')[0].value;
             timeValue+=':00';
             var dd = dateValue.getDate();
             var mm = dateValue.getMonth()+1;
             var yy = dateValue.getFullYear().toString().substr(-2);
             if(dd<10)
             {
                dd='0'+dd;
             }

             if(mm<10)
             {
                mm='0'+mm;
             }
            dateValue = dd+'/'+mm+'/'+yy;
            const response =  fetch("http://localhost:4449/setEventDates?eventDate="+dateValue+"&eventTime="+timeValue)
            console.log(response);
            i--;
        }
    }

    const addElements = () => {
      var original = document.getElementById('hangoutSchedule'+i);
      if(original!=null&&i<5){
         var clone = original.cloneNode(true);
         clone.id = 'hangoutSchedule'+ ++i;
         document.getElementById('schedules').appendChild(clone);
      }
}

    return (
        <div className="newHangouts">
            <label>New Hangouts:<br/> <p>This is the description of the hangout.</p></label>
            <div id="schedules">
            <div id="hangoutSchedule1">
            <label>Date:</label>
            <input type="date"/>
            <label>Time:</label>
            <input type="time"/>
            </div>
            </div>
            <button onClick={addElements}>Add another option</button>
            <Link onClick={addEventDates} to="/eventHangouts" >Done</Link>
        </div>
    );
}