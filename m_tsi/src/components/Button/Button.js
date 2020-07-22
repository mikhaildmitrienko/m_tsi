import React from 'react';
import styled from 'styled-components';


const StyledImage = styled.img`
        width: 500px;
        &:hover{
                opacity: 0.8;
        }
        
`

const Button = props=>{
return (<div onClick={props.onClick}>
      <h1>{props.label}</h1>
      <StyledImage src={props.src}>{props.children}</StyledImage>
      </div>)
      }
export default Button;