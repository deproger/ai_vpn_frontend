import React from 'react'
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <div className='absolute top-0 h-10 w-full px-5 py-5'>
       <Link to="/" className='text-2xl text-white'><HiArrowNarrowLeft/></Link>
    </div>
  )
}
