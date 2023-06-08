import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase'

export default function Profile() {
    const [changeDetail, setChangeDetail]= useState(false)
    const navigate= useNavigate()

   
    
    function onLogout(){
        auth.signOut()
        navigate('/')
    }
    async function onSubmit(){
        try {
            if(auth.currentUser.displayName !== name){
                await updateProfile(auth.currentUser, {
                    displayName:name,
                })
                const docRef = doc(db,'users',auth.currentUser.uid)
                await  updateDoc(docRef, {
                name,
            })
        } toast.success('Profile Updating')
    }catch (error) {
            toast.error('Error')
            
        }

    }
    const auth= getAuth()
    const [formData, setFormData]= useState({
        name:auth.currentUser.displayName,
        email:auth.currentUser.email

    })

    const {name, email}= formData
    function onChange(e){
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value,
        }))}
  return (
    <>
    <section className='flex justify-center items-center flex-col'>
        <h1 className='text-5xl text-center mt-6 font-bold'>My Profile</h1>
        
            <form className='flex flex-col justify-center items-center w-1/2 mt-6 px-3'>
                
                <input type='text' id='name' value={name} disabled={!changeDetail} onChange={onChange}className={`px-4 py-2 text-xl text-gray-700 bg-white
                border border-gray-300 rounded w-1/2 ${changeDetail && 'bg-red-200 focus:bg-red-200'}`}/> 
                
                <input type='text' id='email' value={email} disabled className='px-4 py-2 text-xl text-gray-700 bg-white
                border border-gray-300 rounded w-1/2 mt-6 mb-6'/>
                <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg w-1/2 mt-6'>
                    <p className='flex items-center'>Want to change name?
                    <span className='text-red-600 hover:text-red-800 cursor-pointer ml-3' onClick={() =>{changeDetail && onSubmit();setChangeDetail((prevState)=> !prevState)}}>{changeDetail ? "Apply change": "Edit"}</span></p>
                    <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 cursor-pointer'>Sign Out</p>
                </div>
            </form>
    
    </section>
    </>
  )
}
