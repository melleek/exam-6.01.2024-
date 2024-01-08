import React from 'react'

function Card1({ img, h1, p}) {
  return (
    <div className='flex items-center'>
      <img src={img}/>
      <div className='ml-[-60px] w-[180px] flex flex-col gap-[3px] font-[700]'>
      <h1 className='text-[14px] text-[#9A52FD]'>{h1}</h1>
      <p className='text-[14px]'>{p}</p>
      </div>
    </div>
  )
}

export default Card1
