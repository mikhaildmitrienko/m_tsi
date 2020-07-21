import React from 'react';

function Button(props) {
return (<div>
                <h1>Start tracker!</h1>
                        <button onClick={props.onClick}>
                                Start
                        </button>
        </div>)


}
export default Button;