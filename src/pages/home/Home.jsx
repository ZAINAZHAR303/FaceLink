import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import SideBar from '../../components/sidebar/SideBar'
import RighrBar from '../../components/rightbar/RighrBar'
import Feed from '../../components/feed/Feed'
// import Register from "../register/Register"
import "./home.css"
function Home() {
  return (
    <div className='w-screen '>
      <Topbar  />
      <div className='flex w-[100%] '>
      <SideBar />
      <Feed />
      <RighrBar />
      </div>
      
    </div>
  )
}

export default Home
