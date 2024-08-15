import "./SideBar.css"
import React from 'react'
import { RssFeed,Chat,PlayCircle,Group,Bookmark,HelpOutlineOutlined,Work,Event,School} from "@mui/icons-material";
import CloseFriends from "../friends/CloseFriends";
import { Users } from "../../dummyData"
function SideBar() {
  return (
    <div  className="sidebar  overflow-y-scroll sticky top-[50px]  ">
      <div className="sidebarWrapper p-[20px] ">
        <ul className="sidebarList p-0 m-0 list-none">
                <li className="sidebarListItem flex items-center mb-[20px]">
                    <RssFeed className="sideBarIcon mr-[15px]"/>
                    <span className="sidebarListItemText  ">Feed</span>
                </li>
                <li className="sidebarListItem flex items-center mb-[20px]">
                    <Chat className="sideBarIcon mr-[15px]"/>
                    <span className="sidebarListItemText ">Chats</span>
                </li>
                <li className="sidebarListItem flex items-center mb-[20px]">
                    <PlayCircle className="sideBarIcon mr-[15px]"/>
                    <span className="sidebarListItemText ">Videos</span>
                </li>
                <li className="sidebarListItem flex items-center mb-[20px]">
                    <Group className="sideBarIcon mr-[15px]"/>
                    <span className="sidebarListItemText ">Groups</span>
                </li>
                <li className="sidebarListItem flex items-center mb-[20px]">
                    <Bookmark className="sideBarIcon mr-[15px]"/>
                    <span className="sidebarListItemText ">Bookmarks</span>
                </li>
                <li className="sidebarListItem flex items-center mb-[20px]">
                    <HelpOutlineOutlined className="sideBarIcon mr-[15px]"/>
                    <span className="sidebarListItemText ">Questions</span>
                </li>
                <li className="sidebarListItem flex items-center mb-[20px]">
                    <Work className="sideBarIcon mr-[15px]"/>
                    <span className="sidebarListItemText ">Jobs</span>
                </li>
                <li className="sidebarListItem flex items-center mb-[20px]">
                    <Event className="sideBarIcon mr-[15px]"/>
                    <span className="sidebarListItemText ">Events</span>
                </li>
                <li className="sidebarListItem flex items-center mb-[20px]">
                    <School className="sideBarIcon mr-[15px]"/>
                    <span className="sidebarListItemText ">Courses</span>
                </li>
        </ul>
        <button className="sidebarButton w-[150px] border-none p-[10px] rounded-[5px] font-medium bg-gray-300 max-sm:hidden ">Show More</button>
        <hr className="sideBarhr my-[20px] mx-0"></hr>
        <ul className="sidebarFriendList p-0 m-0 list-none max-sm:hidden ">

        {Users.map(e =>(
            <CloseFriends user={e} />
        ))}
            
            
        </ul>

      </div>
    </div>
  )
}

export default SideBar
