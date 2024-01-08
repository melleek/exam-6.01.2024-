import React from 'react'

function Btn1({h1, btn}) {
  return (
    <div className='flex items-center gap-[20px]'> 
        <button className='bg-[#EAF0F6] rounded-[15px] p-[10px] font-[800] text-[#9A52FD]'>{btn}</button>
        <h1 className='font-[700]'>{h1}</h1>
    </div>
  )
}

export default Btn1
