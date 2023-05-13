import React from 'react'
import styled from 'styled-components'


const StyledTable = styled.table`
width:100%;
th{
    text-align:left;
    text-transform:uppercase;
    color:#A9A9A9;
    font-weight:600;
    font-size:.7rem;
}

td{
    border-top : 1px solid rgba(0,0,0, .3);
}
`

export default function Table(props) {
    return (
        <StyledTable {...props} />
    )
}
