import React from 'react';
import './NotifBox.css'
import styled from 'styled-components';


function NotifBox(props) {
return (<div className="box">

<h2>{props.title}</h2>

<img src={props.src}>{props.children}</img>

</div>)

}
export default NotifBox;