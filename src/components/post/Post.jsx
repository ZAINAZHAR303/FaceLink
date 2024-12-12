// import { postcss } from "tailwindcss";
import "./Post.css";
import { formatDistanceToNow } from "date-fns";
import { saveAs } from 'file-saver';
import {
  Delete,
  Edit,
  MoreVert,
  SendRounded,
  TurnedIn,
} from "@mui/icons-material";
// import { Users } from "../../dummyData";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchComments,
 
  updateComment,
  updateLike,
} from "../../store/slices/feedSlice";
// import OptionModal from "../OptionModal";
import CommentsPopup from "../CommentsPopup";
import { Timestamp } from "firebase/firestore";
import Loader from "../loader/Loader";
function Post({ post }) {
  const [comment, setcomment] = useState("");

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  // const [postComments,setPostComments] = useState([])
  const [commentPopup, setcommentPopup] = useState(false);
  const [loading, setloading] = useState(false);
  
  const user = useSelector((store) => store.authSlice.user);

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
  
  const handleLike = async (productId) => {
    try {
      setloading(true);
      let likeData = {
        uid: user.uid,
        productId,
      };
      await dispatch(updateLike(likeData));
    } finally {
      setloading(false);
    }
  };


  const handleSavePost = (url, fileType) => {
    if (!url) {
      alert("No media URL found to save.");
      return;
    }
  
    // Check if the URL is from a remote server (e.g., media hosted externally)
    if (url.startsWith('http') || url.startsWith('https')) {
      // If it's a URL, fetch the file as a Blob
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          // Use FileSaver.js to save the blob as a file
          const fileName = url.split("/").pop() || (fileType === "video/mp4" ? "video.mp4" : "image.jpg");
          saveAs(blob, fileName); // Trigger the file download
        })
        .catch(err => {
          alert("Failed to download the file.");
          console.error(err);
        });
    } else {
      // If it's a local URL (base64 or blob), directly trigger download
      saveAs(url, fileType === "video/mp4" ? "video.mp4" : "image.jpg");
    }
  };
  
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
    async (postid) => {
      try {
        setloading(true); // Start loading
        await dispatch(fetchComments(postid));
        setcommentPopup(true); // Show the comments popup
      } finally {
        setloading(false); // Stop loading
      }
    },
    [dispatch]
  );
  const handleDelete = async(id)=>{
    try {
      setloading(true); // Start loading
      await dispatch(deletePost(id)); // Delete post from Firestore
    } finally {
      setloading(false); // Stop loading
    }
  }

  // console.log(post);
  return (
    <div className="w-[100%]">
      <div className=" post w-full rounded-[10px] relative my-[30px] mx-0  ">
        <div className="postWrapper p-[10px] ">
          <div className="postTop flex items-center justify-between">
            <div className="postTopLeft flex items-center ">
              <img
                className="postProfileImg w-[32px] h-[32px] object-cover rounded-[50%]"
                src={post.user?.profileImage}
                alt=""
              />
              <span className="postUsername text-[15px] font-medium my-0 mx-[10px] ">
                {" "}
                {post.user?.username}
              </span>
              <span className="postDate text-[12px]">
                {post?.createdAt instanceof Timestamp
                  ? formatDistanceToNow(post.createdAt.toDate()) + " ago"
                  : "Date not available"}
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
                onClick={() => handleLike(post.id)}
                className="likeIcon w-[24px] h-[24px] mr-[5px] cursor-pointer "
                src="assets/heart.png"
                alt=""
              />
              {/* <img
                className="likeIcon  w-[24px] h-[24px] mr-[5px] cursor-pointer"
                src="/assets/like.png"
                alt="fd"
              /> */}
              <span className="postlikeCounter flex gap-2 text-[14px] ">
                {post.like}  <p className="rightBarInfoKey">people like it</p>
              </span>
            </div>
            <div className="postBottomRight flex items-center">
              <span
                onClick={() => commentfetcher(post.id)}
                className="postCommentText cursor-pointer border-b-[1px]  mr-[20px] border-dashed border-gray-400 text-[14px] font-thin">
                {" "}
                comments
              </span>
            </div>
          </div>
          <div className="bg-gray-100 w-[90%] my-[10px] rounded-[10px] h-[60px] flex  items-center pr-[20px] ">
            <form
              onSubmit={(e) => commentHandler(post.id, e)}
              className="flex justify-evenly items-center h-full w-full ">
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
              {post.uid === user.uid ?(
                <>
              <div className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer px-2">
                <Edit sx={{ fontSize: 20 }} className="text-[#1877f2]" />
                <li className="">Edit</li>
              </div>
              <div
                onClick={()=>handleDelete(post.id)}
                className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer px-2">
                <Delete className="text-[#6eedc5]" sx={{ fontSize: 20 }} />
                <li>Delete</li>
              </div>
              </>
            ): null
}

              <div onClick={() => handleSavePost(post.imageURL, post.fileType)} className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer px-2">
                <TurnedIn className="text-[#c96eed]" sx={{ fontSize: 20 }} />
                <li>Save post</li>
              </div>
            </ul>
          </div>
        )}
        {commentPopup && (
          <CommentsPopup onclose={() => setcommentPopup(false)} />
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
}

export default Post;
