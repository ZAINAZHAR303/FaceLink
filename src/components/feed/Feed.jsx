import "./feed.css"
import React, { useEffect } from 'react'
import Share from "../share/Share"
import Post from "../post/Post"
import { getPosts } from "../../store/slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
// import {Posts} from "../../dummyData"
function Feed() {

const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  },[]);
  const posts = useSelector((state)=>state.feedSlice.items) 
  return (
    <div className="feed ">
      <div className="feedWrapper ">
    <Share />
    {posts.map(p =>(
      <Post key={p.id} post={p} />
    ))}
    
      </div>
    </div>
  )
}

export default Feed
