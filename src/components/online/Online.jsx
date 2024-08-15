import React from 'react'
import "./Online.css";

function Online({user}) {
  return (
    
      <li className="rightBarFriend flex items-center mb-[15px]">
            <div className="rightbarImgContainer mr-[10px] relative ">
              <img className="rightbarProfileImg w-[40px] h-[40px] rounded-[50%] object-cover" src={user.profilePicture} alt="" />
              <span className="rightbarOnline w-[12px] h-[12px] rounded-[50%] bg-green-400 absolute top-[-2px] right-0 border-[2px] border-white  "></span>
            </div>
            <span className="righbarUserName font-medium ">{user.username}</span>
        </li>
    
  )
}

export default Online
