import React from 'react'

const Button = ({content, onclickhandler}) => {
  return (
    <button className='shareButton mr-[20px] border-0 py-[7px] px-[10px] rounded-[5px] bg-green-800 font-normal cursor-pointer text-white ml-auto ' onClick={onclickhandler}>{content}</button>

  )
}

export default Button
