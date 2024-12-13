import "./RightBar.css";
import React, { useEffect, useState } from "react";
// import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useDispatch, useSelector } from "react-redux";
import { allusers } from "../../store/slices/authSlice";
function RighrBar({ profile }) {
  const [currentUser, setCurrentUser] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.authSlice.user);

  const Users = useSelector((store) => store.authSlice.allUsers);
  // console.log("all users in sidebar", Users);
  // console.log("Users",Users);
  useEffect(() => {
    dispatch(allusers());
  }, [dispatch]);
  // console.log(Users)
  useEffect(() => {
    {
      if (user) {
        setCurrentUser(user);
      }
    }
  },[user]);
  const HomeRightBar = () => {
    return (
      <div className="HomeRighBar   hidden md:block  ">
        <div className="birthdayConatiner flex items-center  ">
          <img
            className="birthdatImg w-[40px] h-[40px] mr-[10px]"
            src="assets/gift.png"
            alt=""
          />
          <span className="birthdayText  ">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img
          className="rightbarAd w-[100%] rounded-[10px] my-[30px] mx-0 "
          src="assets/ad.png"
          alt=""
        />
        <h4 className="rightbarTitle mb-[20px] font-semibold">
          Online Friends
        </h4>
        <ul className="rightbarFriendList p-0 m-0 list-none">
        {Users && Users.length > 0 ? (
          Users.map((u) => <Online key={u.id} user={u} />)
        ) : (
          <p>Loading users...</p>
        )}
        </ul>
      </div>
    );
  };
  const ProfileRightBar = () => {
    return (
      <div className="p-2">
        <h4 className="rightBarTitle text-[18px] mb-[10px] font-semibold ">
          User information
        </h4>
        <div className="rightBarInfo mb-[30px]">
          <div className="rightbarInfoItem">
            <span className="rightBarInfoKey">City:</span>
            <span className="rightBarInfoValue font-extralight ">
              {currentUser.address}
            </span>
          </div>
        </div>
        <div className="rightBarInfo">
          <div className="rightbarInfoItem">
            <span className="rightBarInfoKey">Phone: </span>
            <span className="rightBarInfoValue">{currentUser.phone}</span>
          </div>
        </div>
        <div className="rightBarInfo">
          <div className="rightbarInfoItem">
            <span className="rightBarInfoKey">Gender:</span>
            <span className="rightBarInfoValue">{currentUser.gender}</span>
          </div>
        </div>
        <div className="rightBarInfo">
          <div className="rightbarInfoItem">
            <span className="rightBarInfoKey">Email:</span>
            <span className="rightBarInfoValue">{currentUser.email}</span>
          </div>
        </div>

        <h4 className="rightBarTitle text-[18px] font-semibold mb-[10px] ">
          User friends
        </h4>
        <div  className="rightBarFollowings grid  grid-cols-3 lg:grid-cols-2 xxl:grid-cols-3 p-2 ">
        {Users &&
          Users.map((user, index) => {
            return (
              // <CloseFriends key={index} user={user} />
              
                <div key={index} className="rightBrFollowing">
                  <img
                    src={user.ImageURL}
                    alt=""
                    className="rightbarfollowingImg"
                  />
                  <span className="rightBarFollowingName">{user.name}</span>
                </div>
              
            );
          })}
          </div>
      
      </div>
    );
  };
  return (
    <div className="rightbar ">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default RighrBar;
