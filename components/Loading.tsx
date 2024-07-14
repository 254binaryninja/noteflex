import React from 'react'
import Lottie from 'lottie-react'
import Load from '../public/animations/Loading.json'

const Loading = () => {
  return (
    <div className='flex-center ml-[35%] mt-40' style={{width:"30%"}}>
        <Lottie animationData={Load} />
    </div>
  )
}

export default Loading