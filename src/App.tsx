import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {NewHangouts} from './components/NewHangouts/NewHangouts';
import {EventHangouts} from './components/EventHangouts/EventHangouts';
import {CreateHangouts} from "./components/CreateHangouts/CreateHangouts";
import {HangoutList} from "./components/HangoutList/HangoutList";
import {FinalResult} from "./components/FinalResult/FinalResult";

const App = () =>  {
    return (
        <div>
            <Router>
                <switch>
                    <Route path='/' exact render={() => (<> <CreateHangouts/></>)}/>
                    <Route path='/newHangouts' component={()=>(<> <NewHangouts/></>)}/>
                    <Route path='/hangoutList' component={()=>(<> <HangoutList/></>)}/>
                    <Route path='/eventHangouts' component={()=>(<> <EventHangouts/></>)}/>
                    <Route path='/finalResult' component={()=>(<> <FinalResult/></>)}/>
                </switch>
            </Router>
        </div>
    );
}

export default App;
