import React from 'react'
import styled, { css } from 'styled-components'
import { primary } from '../lib/colors';
export const ButtonStyle = css`

border:0;
padding: 5px 15px;
border-radius:5px;
cursor:pointer;
display:inline-flex;
align-items:center;
text-decoration:none;
font-weight:bold;
svg{
  height:17px;
  margin-right:5px;
}
${props => props.white && !props.outline && css`
background-color:#fff;
color:#000;
`}

${props => props.white && props.outline && css`
background-color:transparent;
color:#fff;
border: 2px solid #fff;
`}
${props => props.primary && !props.outline && css`
background-color:${primary};
color:#fff;
border: 2px solid ${primary};
`}
${props => props.primary && props.outline && css`
background-color:transparent;
color:${primary};
border: 2px solid ${primary};
`}
${props => props.size === 'l' && css`
  font-size:1.2rem;
  padding: 10px 20px;
  svg{
    height:20px;
  }
  `}

`

const StyledButton = styled.button`${ButtonStyle}`;

export default function Button({ children, ...rest }) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}
