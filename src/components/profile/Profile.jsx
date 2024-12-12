import "./Profile.css";
import Topbar from "../../components/topbar/Topbar";
import SideBar from "../../components/sidebar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RighrBar"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


export default function Profile() {

const [currentUser,setCurrentUser] = useState("")
  const Users = useSelector((store) => store.authSlice.user);

  useEffect(() => {
  {
    if (Users) {
      setCurrentUser(Users);
    } 
  }
  })
  return (
    <>
      <Topbar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src={currentUser.ImageURL}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{currentUser.name}</h4>
                <span className="profileInfoDesc">Hello, it's {currentUser.name}</span>
            </div>
          </div>
          <div className="profileRightBottom">
          <div className="hidden md:block">
              <Feed />
            </div>
            <RightBar profile/>
          </div>
        </div>
      </div>
    </>
  );
}