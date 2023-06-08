import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

function Header() {
    const[pageState,setPageState]=useState('Sign In')
    const location= useLocation()
    const navigate= useNavigate()
    const auth= getAuth()
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
        if(user){
            setPageState('Profile')
        } else{
            setPageState('Sign In')
        }

        })
    }, [auth])
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
                <li className= {`cursor-pointer py-3 text-sm font-semibold text-gray-400 
            ${pathMathRoute('/') && "text-black  border-b-red-500 border-b-[3px]"}`} onClick={()=>navigate('/')}>Home</li>
                <li  className= {`cursor-pointer py-3 text-sm font-semibold text-gray-400 
            ${pathMathRoute("/offers") && "text-black border-b-red-500 border-b-[3px] "}`}onClick={()=>navigate('/offers')}>Offers</li>
                <li className= {`cursor-pointer py-3 text-sm font-semibold text-gray-400 
            ${(pathMathRoute("/sign-in") ||  pathMathRoute("/profile")) && "text-black border-b-red-500 border-b-[3px] "}`} onClick={()=>navigate('/profile')}>{pageState}</li>
            </ul>
            </div> 
        </header>
    </div>
  )
}

export default Header