import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

function Header() {
    const location= useLocation()
    const navigate= useNavigate()
    function pathMathRoute(route){
        if(route === location.pathname)
        return true
    }
  return (
    <div className='bg-white border-b shadow-sm sticky top 0 z-50'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
         <div> <img src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg'
         className='h-5 cursor-pointer' alt='logo' onClick={()=>navigate('/')}/>
         </div>  
         <div>
            <ul className='flex space-x-10 cursor-pointer'>
                <li className= {`py-3 text-sm font-semibold text-gray-400 
            ${pathMathRoute('/') && "text-black  border-b-red-500 border-b-[3px]"}`} onClick={()=>navigate('/')}>Home</li>
                <li  className= {`py-3 text-sm font-semibold text-gray-400 
            ${pathMathRoute("/offers") && "text-black border-b-red-500 border-b-[3px] "}`}onClick={()=>navigate('/offers')}>Offers</li>
                <li className= {`py-3 text-sm font-semibold text-gray-400 
            ${pathMathRoute("/sign-in") && "text-black border-b-red-500 border-b-[3px] "}`} onClick={()=>navigate('/sign-in')}>Sign In</li>
            </ul>
            </div> 
        </header>
    </div>
  )
}

export default Header