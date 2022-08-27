import React from 'react'

function Dice(props) {
  return (
    <div className={`dice${props.froze ? " froze" : ""}`} id={props.id}>{props.value}</div>
  )
}

export default Dice
