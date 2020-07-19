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
            <h3>Our Team</h3>
            <h4>Motto/Slogan</h4>
        </header>
    </div>
</div>)
}

export default Title;