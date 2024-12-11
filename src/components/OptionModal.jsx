import React, { useRef } from 'react'

const OptionModal = ({onClose}) => {
  const modelref = useRef();

    // const CloseModel = (e) => {
    //     if (modelref.current === e.target) {
    //       onClose();
    //     }
    //   };
  return (
    // <div ref={modelref}
    // onClick={CloseModel}
    // // bg-[rgba(0,0,0,0.4)]
    // className="    flex items-center justify-center">
      <div className='z-30 h-[300px] w-[300px] bg-white'>

      </div>
    
  )
}

export default OptionModal
