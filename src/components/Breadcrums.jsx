import React from 'react'
import { useNavigate } from 'react-router-dom'

const Breadcrums = ({title}) => {
    const navigate = useNavigate()
  return (
    <div className='max-w-6xl pt-5 px-5 my-10'>
      <h1 className='text-xl text-[#155dfc] font-semibold mt-[10px]'><span className='cursor-pointer' onClick={()=>navigate('/')}>Home</span> / <span className='cursor-pointer' onClick={()=>navigate('/products')}>Products</span> / <span>{title}</span></h1>
    </div>
  )
}

export default Breadcrums