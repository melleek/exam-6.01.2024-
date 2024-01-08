import React from 'react'

function Card2({btn, h1, p, span, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, str,img}) {
  return (
    <div className='flex justify-between lg:gap-[40px] sm:flex-wrap lg:flex-nowrap'>
      <aside className='flex flex-col gap-[40px] items-start'>
        <button className='bg-[#fff] p-[8px] px-[10px] text-[#4061F8] font-[700] gh'>{btn}</button>
        <div>
        <h1 className='text-[38px] font-[700]'>{h1}</h1>
        <p className='lg:w-[280px] font-[700] text-[14px]'>{p}</p>
        </div>
        <span className='text-[22px] font-[700]'>{span}</span>
        <div className='flex flex-wrap gap-[10px]'>
          <button className='bg-[#fff] rounded-[30px] px-[15px] py-[3px] text-[center] font-[600]'>{t1}</button>
          <button className='bg-[#fff] rounded-[30px] px-[15px] py-[3px] text-[center] font-[600]'>{t2}</button>
          <button className='bg-[#fff] rounded-[30px] px-[15px] py-[3px] text-[center] font-[600]'>{t3}</button>
          <button className='bg-[#fff] rounded-[30px] px-[15px] py-[3px] text-[center] font-[600]'>{t4}</button>
          <button className='bg-[#fff] rounded-[30px] px-[15px] py-[3px] text-[center] font-[600]'>{t5}</button>
          <button className='bg-[#fff] rounded-[30px] px-[15px] py-[3px] text-[center] font-[600]'>{t6}</button>
          <button className='bg-[#fff] rounded-[30px] px-[15px] py-[3px] text-[center] font-[600]'>{t7}</button>
          <button className='bg-[#fff] rounded-[30px] px-[15px] py-[3px] text-[center] font-[600]'>{t8}</button>
          <button className='bg-[#fff] rounded-[30px] px-[15px] py-[3px] text-[center] font-[600]'>{t9}</button>
          <button className='bg-[#fff] rounded-[30px] px-[15px] py-[3px] text-[center] font-[600]'>{t10}</button>
        </div>
        <p className='flex items-center gap-[10px] font-[700]'>{t11} <img src={str} alt="" /></p>
      </aside>
      <img src={img} className='lg:block sm:hidden'/>
    </div>
  )
}

export default Card2
