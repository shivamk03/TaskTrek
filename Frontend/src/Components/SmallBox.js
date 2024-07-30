import React from 'react'

export default function SmallBox(props) {
  return (
    <div>
      <p>Heading : {props.heading}</p>
      <p>Description : {props.description}</p>
      <p>Status: {props.status}</p>
      {props.comment?<p>Comment by Team Mate: {props.comment}</p>:""}
    </div>
  )
}
