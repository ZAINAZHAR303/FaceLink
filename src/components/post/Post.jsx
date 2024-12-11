// import { postcss } from "tailwindcss";
import "./Post.css";
import {
  Delete,
  Edit,
  MoreVert,
  SendRounded,
  TurnedIn,
} from "@mui/icons-material";
import { Users } from "../../dummyData";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, getPosts, updateComment, updateLike } from "../../store/slices/feedSlice";
import OptionModal from "../OptionModal";
import CommentsPopup from "../CommentsPopup";
function Post({ post }) {
  
  const [comment, setcomment] = useState("");
  

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  // const [postComments,setPostComments] = useState([])
  const [commentPopup, setcommentPopup] = useState(false);
  const user = useSelector(store => store.authSlice.user)
  
  // useEffect(()=>{
  //   setPostComments(currentPostComments)
  //   console.log(currentPostComments);
  // },[currentPostComments]);
  
    
const dispatch = useDispatch();
  // Close popup when clicking outside
  const closePopup = () => {
    setIsPopupVisible(false);
    // setcommentPopup(false);
  };

  // Attach closePopup to document click
  useEffect(() => {
    document.addEventListener("click", closePopup);
    document.addEventListener("scroll", closePopup);
    return () => {
      document.removeEventListener("click", closePopup);
      document.removeEventListener("scroll", closePopup);
    };
  }, []);

  const handleLike = (productId)=>{
    let likeData ={
      uid: user.uid,
      productId,

    }
    dispatch(updateLike(likeData))
    
  }
  const commentHandler = useCallback(
    (postid, e) => {
      e.preventDefault();
      if (!comment.trim()) return;
      let commentData = {
        uid: user.uid,
        postid,
        comment,
      };
      dispatch(updateComment(commentData));
      setcomment("");
    },
    [dispatch, user.uid, comment]
  );
  const commentfetcher = useCallback(
    (postid) => {
      
        dispatch(fetchComments(postid));
      
      setcommentPopup(true);
    },
    [dispatch]
  );

  // console.log(post);
  return (
    <div>
      <div className="bg-blue-200 post w-full rounded-[10px] relative my-[30px] mx-0  ">
        <div className="postWrapper p-[10px] ">
          <div className="postTop flex items-center justify-between">
            <div className="postTopLeft flex items-center ">
              <img
                className="postProfileImg w-[32px] h-[32px] object-cover rounded-[50%]"
                src={post.UserImg}
                alt=""
              />
              <span className="postUsername text-[15px] font-medium my-0 mx-[10px] ">
                {" "}
                {post.UserName}
              </span>
              <span className="postDate text-[12px]">
                {post?.createAt?.seconds
                  ? new Date(post?.createAt?.toDate()).toLocaleDateString()
                  : new Date(post?.createAt).toLocaleDateString()}
              </span>
            </div>
            <div className="postTopRight">
              <MoreVert
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from propagating to document
                  setIsPopupVisible(true);
                }}
              />
            </div>
          </div>
          <div className="postCenter my-[20px] mx-0 ">
            <span className="postText">{post.postText}</span>
            {post.imageURL &&
              (post.fileType === "video/mp4" ? (
                <video
                  className="postImg mt-[20px]  w-[100%] max-h-[500px] object-contain"
                  src={post.imageURL}
                  controls
                  autoPlay
                  loop
                  muted></video>
              ) : (
                <img
                  className="postImg mt-[20px]  w-[100%] max-h-[500px] object-contain"
                  src={post.imageURL}
                  alt="Product Image"
                />
              ))}
            {/* <img className="postImg mt-[20px]  w-[100%] max-h-[500px] object-contain" src={post.imageURL} alt="" /> */}
          </div>
          <div className="postBottom flex items-center justify-between  ">
            <div className="postBottomLeft flex  items-center ">
              <img
              onClick={()=>handleLike(post.id)}
                className="likeIcon w-[24px] h-[24px] mr-[5px] cursor-pointer "
                src="assets/heart.png"
                alt=""
              />
              <img
                className="likeIcon  w-[24px] h-[24px] mr-[5px] cursor-pointer"
                src="/assets/like.png"
                alt="fd"
              />
              <span className="postlikeCounter text-[14px] ">
                {post.like}
                people like it
              </span>
            </div>
            <div className="postBottomRight flex items-center">
              <span onClick={()=>commentfetcher(post.id)} className="postCommentText cursor-pointer border-b-[1px]  mr-[20px] border-dashed border-gray-400 text-[14px] font-thin">
                {" "}
                comments
              </span>
            </div>
          </div>
          <div className="bg-gray-100 w-[90%] my-[10px] rounded-[10px] h-[60px] flex  items-center pr-[20px] ">
            <form onSubmit={(e)=>commentHandler(post.id,e)} className="flex justify-evenly items-center h-full w-full ">
              <input
                type="text"
                
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                placeholder="write a public comment"
                className=" text-black bg-gray-100 focus: outline-none h-[100%] w-[100%]  pl-[20px] rounded-tl-[10px] rounded-bl-[10px] "
              />
              <button type="submit">
              
                <SendRounded className="hover: cursor-pointer" />
              </button>
            </form>
          </div>
        </div>
        {isPopupVisible && (
          <div className="popup-container absolute top-8 right-6 mt-[8px] bg-[#ffffff] shadow-lg py-2  z-100 rounded-lg ">
            <ul className="flex flex-col gap-2  ">
              <div className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer px-2">
                <Edit sx={{ fontSize: 20 }} className="text-[#1877f2]" />
                <li className="">Edit</li>
              </div>
              <div className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer px-2">
                <Delete className="text-[#6eedc5]" sx={{ fontSize: 20 }} />
                <li>Delete</li>
              </div>
             
              <div className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer px-2">
                <TurnedIn className="text-[#c96eed]" sx={{ fontSize: 20 }} />
                <li>Save post</li>
              </div>
            </ul>
          </div>
        )}
        {
          commentPopup && (
            
          <CommentsPopup onclose={()=>setcommentPopup(false)}  />
          
          )
        }
      </div>
    </div>
  );
}

export default Post;
