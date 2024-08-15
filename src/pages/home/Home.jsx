import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import SideBar from '../../components/sidebar/SideBar'
import RighrBar from '../../components/rightbar/RighrBar'
import Feed from '../../components/feed/Feed'
import "./home.css"
function Home() {
  return (
    <>
      <Topbar  />
      <div className='flex w-[100%] '>
      <SideBar />
      <Feed />
      <RighrBar />
      </div>
    </>
  )
}

export default Home
