import "./RightBar.css";
import React from "react";
import { Users } from "../../dummyData";
import Online from "../online/Online";
function RighrBar({ profile }) {
  const HomeRightBar = () => {
    return (
      <div className="HomeRighBar max-sm:hidden  ">
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
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    );
  };
  const ProfileRightBar = () => {
    return (
      <>
        <h4 className="rightBarTitle text-[18px] mb-[10px] font-semibold ">
          User information
        </h4>
        <div className="rightBarInfo mb-[30px]">
          <div className="rightbarInfoItem">
            <span className="rightBarInfoKey">City:</span>
            <span className="rightBarInfoValue font-extralight ">New York</span>
          </div>
        </div>
        <div className="rightBarInfo">
          <div className="rightbarInfoItem">
            <span className="rightBarInfoKey">From:</span>
            <span className="rightBarInfoValue">Madrid</span>
          </div>
        </div>
        <div className="rightBarInfo">
          <div className="rightbarInfoItem">
            <span className="rightBarInfoKey">Relationship:</span>
            <span className="rightBarInfoValue">Single</span>
          </div>
        </div>

        <h4 className="rightBarTitle text-[18px] font-semibold mb-[10px] ">
          User friends
        </h4>
        <div className="rightBarFollowings">
          <div className="rightBrFollowing">
            <img
              src="assets/person/1.jpeg"
              alt=""
              className="rightbarfollowingImg"
            />
            <span className="rightBarFollowingName">John Carter</span>
          </div>

          <div className="rightBrFollowing">
            <img
              src="assets/person/2.jpeg"
              alt=""
              className="rightbarfollowingImg"
            />
            <span className="rightBarFollowingName">John Carter</span>
          </div>

          <div className="rightBrFollowing">
            <img
              src="assets/person/3.jpeg"
              alt=""
              className="rightbarfollowingImg"
            />
            <span className="rightBarFollowingName">John Carter</span>
          </div>

          <div className="rightBrFollowing">
            <img
              src="assets/person/4.jpeg"
              alt=""
              className="rightbarfollowingImg"
            />
            <span className="rightBarFollowingName">John Carter</span>
          </div>

          <div className="rightBrFollowing">
            <img
              src="assets/person/5.jpeg"
              alt=""
              className="rightbarfollowingImg"
            />
            <span className="rightBarFollowingName">John Carter</span>
          </div>

          <div className="rightBrFollowing">
            <img
              src="assets/person/6.jpeg"
              alt=""
              className="rightbarfollowingImg"
            />
            <span className="rightBarFollowingName">John Carter</span>
          </div>
        </div>
      </>
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
