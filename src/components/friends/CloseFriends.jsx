import React from 'react'

function CloseFriends({user}) {
  return (
    <li className="sidebarFriend flex items-center mb-[15px]">
    <img  className="sideBarFriendImg w-[32px] h-[32px] rounded-[50%] object-cover mr-[10px]" src={user.ImageURL} alt="" />
    
    <span className="sideBarfriendName">{user.name}</span>
    </li>   

  )
}

export default CloseFriends
