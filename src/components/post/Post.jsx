// import { postcss } from "tailwindcss";
import "./Post.css"
import {MoreVert, SendRounded} from '@mui/icons-material';
import {Users} from "../../dummyData";
import { useState, useEffect } from "react";
function Post({post}) {
  const [like,setLike] = useState(post.like)
  const [isLiked, setIsLiked] = useState(false);
  const [show, setShow] = useState(post.comment);
  const [comment,setcomment] = useState('')
  // const [Isshowed,setIsshowed] = useState(false)


  useEffect(() => {
    setShow(0);
  }, [post]);


  const LikeHandler =()=>{
    setIsLiked(!isLiked);
    setLike(isLiked ? like - 1 : like + 1);


  }
  const commentHandler = (e) => {
    e.preventDefault()
    setShow((prevShow) => prevShow + 1);
    setcomment('')
  };
  

  // console.log(post)
  return (
    <div>
      <div className="post w-full rounded-[10px] my-[30px] mx-0  ">
        <div className="postWrapper p-[10px] ">
          <div className="postTop flex items-center justify-between">
              <div className="postTopLeft flex items-center ">
                <img  className="postProfileImg w-[32px] h-[32px] object-cover rounded-[50%]" src={Users.filter((u) => u.id ===post.userId) [0].profilePicture}alt="" />
                <span className="postUsername text-[15px] font-medium my-0 mx-[10px] " > {Users.filter((u) => u.id ===post.userId) [0].username}</span>
                <span className="postDate text-[12px]" >{post.date}</span>
              </div>
              <div className="postTopRight">
                <MoreVert />
              </div>
          </div>
          <div className="postCenter my-[20px] mx-0 ">
            <span className="postText">{post.desc}</span>
            <img className="postImg mt-[20px]  w-[100%] max-h-[500px] object-contain" src={post.photo} alt="" />
          </div>
          <div className="postBottom flex items-center justify-between  ">
            <div className="postBottomLeft flex  items-center ">
              <img className="likeIcon w-[24px] h-[24px] mr-[5px] cursor-pointer " onClick={LikeHandler} src="assets/heart.png" alt="" />
              <img className="likeIcon  w-[24px] h-[24px] mr-[5px] cursor-pointer" onClick={LikeHandler} src="/assets/like.png" alt="fd" />
              <span className="postlikeCounter text-[14px] ">{like} people like it</span>
            </div>
            <div className="postBottomRight flex items-center">
                
                <span className="postCommentText cursor-pointer border-b-[1px]  mr-[20px] border-dashed border-gray-400 text-[14px] font-thin"  >{show} comments</span>
            </div>
           
          </div>
          <div className="bg-gray-100 w-[90%] my-[10px] rounded-[10px] h-[60px] flex  items-center pr-[20px] " >
            <form onSubmit={commentHandler} className="flex justify-evenly items-center h-full w-full ">
              <input type="text" name={comment} value={comment} onChange={(e)=> setcomment(e.target.value)} placeholder="write a public comment" className=" text-black bg-gray-100 focus: outline-none h-[100%] w-[100%]  pl-[20px] rounded-tl-[10px] rounded-bl-[10px] "   />
              <button type="submit" > <SendRounded className="hover: cursor-pointer" /></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
