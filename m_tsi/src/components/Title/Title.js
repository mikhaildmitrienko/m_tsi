import React from 'react';
import './Title.css'
import logo from './logo.png'

function Title(){
return(
<div className="Title">
    <header>
    <img id="crab" src={logo} alt="logo"/>
    <h1>Ancor</h1>
    <h2>Ancor</h2>
    </header>
</div>)
}

export default Title;