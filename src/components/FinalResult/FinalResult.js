import React, { useState,useEffect } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';
import {hangout_store} from "../hangout_store";

export const FinalResult = () =>{
return(
        <div>
            <p>The selected event date is:</p>
            <h1>{hangout_store.finalDate}</h1>
        </div>
    )
}