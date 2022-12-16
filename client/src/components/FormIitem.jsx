import React from 'react'

function FormItem({props}) {
  return (
    <>
      {props &&  <input type={props.type} placeholder={props.placeholder} name={props.name} />}

    </>
  )
}

export default FormItem