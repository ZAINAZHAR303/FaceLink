import "./feed.css"
import React, { useEffect, useState } from 'react'
import Share from "../share/Share"
import Post from "../post/Post"
import { getPosts } from "../../store/slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
// import {Posts} from "../../dummyData"
function Feed() {
  const[loading,setloading] = useState(false)
const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts({setloading}));
  },[dispatch]);
  const posts = useSelector((state)=>state.feedSlice.items) 
  return (
    <div className="feed ">
      <div className="feedWrapper ">
    <Share />
    {posts.map(p =>(
      <Post key={p.id} post={p} />
    ))}
    
      </div>
      {
        loading && (
          <Loader />
        )

  
      }
    </div>
  )
}

export default Feed
