import React, { useEffect, useRef, useState } from 'react'
import"./Share.css"
import Button from "../Button"
import {PermMedia,Label,Room,EmojiEmotions} from "@mui/icons-material"
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../store/slices/feedSlice'
function Share() {
  const[file,setFile] = useState("")
  const[loading,setLoading] = useState(false)
  const [imageURL, setImageURL] = useState("");
  const[fileType,setfileType] = useState("")
  const [postText,setpostText] = useState("")
  const [like, setLike] = useState(0)
  
const dispatch = useDispatch();
const user = useSelector(store => store.authSlice.user)
    const post = useSelector(store => store.feedSlice.updatePost)
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (post) {
      setpostText(post.postText);

    }else{
      setpostText("")
    }
  },[post])

  const createPostHandler = ()=>{
    setfileType(file.type)
    console.log("file type: ", file.type)
    let postData = {
      uid: user.uid,
      like,
      postText,
      imageURL,
      fileType,

    }
    if (post){
      dispatch(updatePost({ ...postData,id:post.id}))
      return
     }
      dispatch(createPost({ ...postData,file,setLoading}))
      setpostText("")
      setFile("")
    }

  const handleFileClick = () => {
      
          fileInputRef.current.click();
      
  };
  return (
    <div className='share w-[100%] h-[170px] rounded-[10px] '>
      <div className="ShareWrapper p-[10px]">
        <div className="shareTop flex  items-center  ">
            <img  className="shareProfileImg w-[50px] h-[50px] rounded-[50%] object-cover mr-[10px]  " src="/assets/person/1.jpeg" alt="" />
            {/* <textarea   /> */}
            <textarea className='shareInput border-none w-[80%] focus:outline-none' placeholder="what's in your mind shafak?" onChange={(e)=>setpostText(e.target.value)} id=""></textarea>
        </div>
        <hr className='shareHr m-[20px]'></hr>
        <div className="shareButtom flex items-center justuify-between  ">
            <div className="shareOptions flex  w-[100%] ">
            <div className="shareoption ml-[20px] cursor-pointer" onClick={handleFileClick} >
            <PermMedia htmlColor="tomato" className="shareIcon text-[18px] mr-[3px]" />
            <span className="ShareOptionText">Photo/Video</span>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} 
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
            />
        </div>
                <div className="shareoption ">
                    <Label htmlColor='blue' className="shareIcon text-[18px] mr-[3px] "/>
                    <span className='ShareOptionText'>Tag</span>
                </div>
                <div className="shareoption ">
                    <Room htmlColor='green' className="shareIcon text-[18px] mr-[3px] "/>
                    <span className='ShareOptionText'>Location</span>
                </div>
                <div className="shareoption ">
                    <EmojiEmotions htmlColor='goldenrod' className="shareIcon text-[18px] mr-[3px] "/>
                    <span className='ShareOptionText'>Feelings</span>
                </div>
                <Button content={post?'Update':'Create'} onclickhandler={createPostHandler} />
                
            </div>

        </div>
      </div>
    </div>
  )
}

export default Share
