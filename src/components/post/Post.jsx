// import { postcss } from "tailwindcss";
import "./Post.css"
import {MoreVert, SendRounded} from '@mui/icons-material';
import {Users} from "../../dummyData";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../store/slices/feedSlice";
function Post({post}) {
  // const [like,setLike] = useState(post.like)
  // const [isLiked, setIsLiked] = useState(false);
  // const [show, setShow] = useState(post.comment);
  const [comment,setcomment] = useState('')
  // const [Isshowed,setIsshowed] = useState(false)

  
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   setShow(0);

  // }, [post]);   


 
  
console.log(post)
  return (
    <div>
      <div className="post w-full rounded-[10px] my-[30px] mx-0  ">
        <div className="postWrapper p-[10px] ">
          <div className="postTop flex items-center justify-between">
              <div className="postTopLeft flex items-center ">
                <img  className="postProfileImg w-[32px] h-[32px] object-cover rounded-[50%]" src={post.UserImg}alt="" />
                <span className="postUsername text-[15px] font-medium my-0 mx-[10px] " > {post.UserName}</span>
                <span className="postDate text-[12px]" >{ post?.createAt?.seconds ? new Date(post?.createAt?.toDate()).toLocaleDateString() : new Date(post?.createAt).toLocaleDateString()}</span>
              </div>
              <div className="postTopRight">
                <MoreVert />
              </div>
          </div>
          <div className="postCenter my-[20px] mx-0 ">
            <span className="postText">{post.postText}</span>
            {post.imageURL &&
              (
                post.fileType === "video/mp4"?(
                  <video className="postImg mt-[20px]  w-[100%] max-h-[500px] object-contain" src={post.imageURL} controls autoPlay loop muted></video>
                ):(
                  <img className="postImg mt-[20px]  w-[100%] max-h-[500px] object-contain" src={post.imageURL} alt="Product Image" />
                
                )
              )
        }
            {/* <img className="postImg mt-[20px]  w-[100%] max-h-[500px] object-contain" src={post.imageURL} alt="" /> */}
          </div>
          <div className="postBottom flex items-center justify-between  ">
            <div className="postBottomLeft flex  items-center ">
              <img className="likeIcon w-[24px] h-[24px] mr-[5px] cursor-pointer "  src="assets/heart.png" alt="" />
              <img className="likeIcon  w-[24px] h-[24px] mr-[5px] cursor-pointer"  src="/assets/like.png" alt="fd" />
              <span className="postlikeCounter text-[14px] "> people like it</span>
            </div>
            <div className="postBottomRight flex items-center">
                
                <span className="postCommentText cursor-pointer border-b-[1px]  mr-[20px] border-dashed border-gray-400 text-[14px] font-thin"  > comments</span>
            </div>
           
          </div>
          <div className="bg-gray-100 w-[90%] my-[10px] rounded-[10px] h-[60px] flex  items-center pr-[20px] " >
            <form  className="flex justify-evenly items-center h-full w-full ">
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
