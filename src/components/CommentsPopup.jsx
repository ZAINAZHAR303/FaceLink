import { Timestamp } from "firebase/firestore";
import React, { useRef} from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
const CommentsPopup = ({ onclose }) => {
  // const [comments, setComments] = useState([]);
  const currentPostComments = useSelector(
    (store) => store.feedSlice.commentsByPost
  );
  
  const modelref = useRef();
  const CloseModel = (e) => {
    if (modelref.current === e.target) {
      onclose();
    }
  };
  // console.log("post comments in comment popup", currentPostComments);
  //   console.log("post comments in stste" , comments)
  return (
    <div
      ref={modelref}
      onClick={CloseModel}
      className="h-screen w-screen inset-0 z-[99999] bg-[rgba(0,0,0,0.4)] fixed flex items-center justify-center">
      <div className="w-[400px] h-[400px] rounded-lg p-4 overflow-y-scroll scroll-smooth bg-white">
        {currentPostComments.length > 0 ? (
          currentPostComments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-4 items-start justify-start">
              <img
                src={comment.user.profileImage}
                className="w-[40px] h-[40px] rounded-full object-cover"
                alt="hello"
              />
              <div className="bg-[#d6e5fc95] w-[80%] rounded-xl mb-2 flex flex-col items-start justify-start  p-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold ">{comment.user.username}</p>
                  <span className="postDate text-[10px] text-slate-400 ">
                    {comment?.createAt instanceof Timestamp
                      ? formatDistanceToNow(comment.createAt.toDate()) + " ago"
                      : "Date not available"}
                  </span>
                </div>
                <h1>{comment.comment || "No comment available"}</h1>
              </div>
            </div>
          ))
        ) : (
          <h1>No comments available</h1>
        )}
      </div>
    </div>
  );
};

export default CommentsPopup;
