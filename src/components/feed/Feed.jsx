import "./feed.css"
import React from 'react'
import Share from "../share/Share"
import Post from "../post/Post"
import {Posts} from "../../dummyData"
function feed() {
  return (
    <div className="feed ">
      <div className="feedWrapper ">
    <Share />
    {Posts.map(p =>(
      <Post key={p.id} post={p} />
    ))}
    
      </div>
    </div>
  )
}

export default feed
