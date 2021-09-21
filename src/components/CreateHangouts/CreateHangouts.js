import React from 'react';
import './CreateHangouts.css';
import {Link} from 'react-router-dom';

export const CreateHangouts = () => {

    return (
        <div className="createHangouts">
        <Link to="/newHangouts" className="btn btn-success btn-sm col-sm-1">Create a new Hangout</Link>
        </div>
    );
}