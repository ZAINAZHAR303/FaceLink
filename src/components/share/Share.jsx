import React from 'react'
import"./Share.css"
import {PermMedia,Label,Room,EmojiEmotions} from "@mui/icons-material"
function Share() {
  return (
    <div className='share w-[100%] h-[170px] rounded-[10px] '>
      <div className="ShareWrapper p-[10px]">
        <div className="shareTop flex items-center">
            <img  className="shareProfileImg w-[50px] h-[50px] rounded-[50%] object-cover mr-[10px]  " src="/assets/person/1.jpeg" alt="" />
            <input className='shareInput border-none width-[80%] focus:outline-none' placeholder="what's in your mind shafak?" />
        </div>
        <hr className='shareHr m-[20px]'></hr>
        <div className="shareButtom flex items-center justuify-between  ">
            <div className="shareOptions flex  w-[100%] ">
                <div className="shareoption ml-[20px]">
                    <PermMedia htmlColor='tomato' className="shareIcon text-[18px] mr-[3px] "/>
                    <span className='ShareOptionText '>Photo or Video</span>
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

                <button className='shareButton mr-[20px] border-0 py-[7px] px-[10px] rounded-[5px] bg-green-800 font-normal cursor-pointer text-white ml-auto '>share</button>
                
            </div>

        </div>
      </div>
    </div>
  )
}

export default Share
