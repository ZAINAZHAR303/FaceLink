import "./topbar.css";
import { useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import { Person, Chat, Notifications, MenuRounded } from "@mui/icons-material";
import Profile from "../profile/Profile";
import SideBar from "../sidebar/SideBar";
function Topbar() {

  
  const [showBar, setShowProfile] = useState(false);
  
    const handleClick = () => {
      setShowProfile(true);
    };
  return (
    <div className="topbarContainer bg-[#1877f2] h-[50px] flex items-center sticky top-0 z-50 w-screen   ">
      <div className="topbarLeft basis-[25.1%]">
        <span className="logo text-[24px] ml-[20px] font-bold text-white cursor-pointer ">FaceLink</span>
      </div>


      <div className="topbarCenter basis-[41.6%] max-sm:basis-[30%] ">
        <div className="searchBar w-[100%]  h-[30px] bg-white rounded-[30px] flex items-center ">
          <SearchIcon className=" search "/>
          <input
            placeholder="Search for friend,post,or video"
            className="searchInput border-0 w-[70%] max-sm:text-[12px]   "
          />
        </div>
      </div>


      <div className="topbarRight basis-[33.3%] max-sm:basis-[44.1%] flex items-center justify-around text-white">
        <div className="topBarLinks">
          <span className="topbarLink max-[944px]:hidden ">Homepage</span>
          <span className="topbarLink max-[944px]:hidden">Timeline</span>
        </div>
        <div className="menu "  onClick={handleClick} >
          <MenuRounded className="menuIcon"  />
        </div>

        <div className="topBarIcons flex ">
          <div className="topbarIconsItem">
            <Person />
            <span className="topbarIconBadge  ">1</span>
          </div>

          <div className="topbarIconsItem">
            <Chat />
            <span className="topbarIconBadge  ">1</span>
          </div>
          <div className="topbarIconsItem">
            <Notifications />
            <span className="topbarIconBadge  ">1</span>
          </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="h-[32px] w-[32px] rounded-[50%] object-cover cursor-pointer  " />
        
      </div>
    </div>
  );
}

export default Topbar;
