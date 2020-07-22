import React from 'react';
import './Title.css'
import logo from './logo.png'

function Title(){
return(
<div className="Title">
    <div>
        <img id="crab" src={logo} alt="logo"/>
    </div>
    <div>
        <header>
            <h1>Ancor</h1>
            <h2>Ancor</h2>
            <h3>Set Sail for a</h3>
            <h4>Better Work Day</h4>
            <hr class="solid"></hr>
            <hr class="solid1"></hr>
            <hr class="solid2"></hr>
        </header>
    </div>
</div>)
}

export default Title;