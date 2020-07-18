import React from 'react';
import './NotifBox.css'

function NotifBox(props) {
return (<div className="box">

<h2>{props.title}</h2>  
    <p>
        {props.status}
    </p>

</div>)

}
export default NotifBox;