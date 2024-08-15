import React from 'react'

function CloseFriends({user}) {
  return (
    <li className="sidebarFriend flex items-center mb-[15px]">
    <img  className="sideBarFriendImg w-[32px] h-[32px] rounded-[50%] object-cover mr-[10px]" src={user.profilePicture} alt="" />
    <span className="sideBarfriendName">{user.username}</span>
    </li>   

  )
}

export default CloseFriends
