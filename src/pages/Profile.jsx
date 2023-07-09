import { getAuth, updateProfile } from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { FcHome } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import ListingItem from '../components/ListingItem'

export default function Profile() {
    const [changeDetail, setChangeDetail]= useState(false)
    const navigate= useNavigate()
const [listings,setListings]=useState([])

    
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
        useEffect(()=>{
async function fetchuserListing(){
    const listingRef= collection(db,'listing')
    const q= query(listingRef, where('userRef','==', auth.currentUser.uid), orderBy('timestamp', 'desc')
    )
    const querySnap= await getDocs(q)
    let listings= []
    querySnap.forEach((doc)=>{
        return listings.push({
            id: doc.id,
            data: doc.data()
        })
    })
    setListings(listings)
} 
fetchuserListing()
        },[auth.currentUser.uid]);
        async function onDelete(listingID){
if(window.confirm('Are you sure you want to delete this listing?')){
    await deleteDoc(doc(db,'listing',listingID))
    const updatedListings= listings.filter(
        (listing) => listing.id !== listingID
    )
    setListings(updatedListings)
    toast.success('Deleted Listing')
}
        }
        function onEdit(listingID){
navigate(`/edit-listing/${listingID}`)
        }
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
            
            <button type='submit' onClick={()=>navigate('/create-listing')}className='w-1/4 bg-blue-600 text-white uppercase px-7 py-3 font-medium
            hover:bg-blue-800 mt-6'>Sell Or Rent Home</button>
    
    </section>
    <div className='max-w 6x-l px-3 mt-6'>
        <h2 className='text-2xl text-center font-semibold'>My Listings</h2>
        <ul className='sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3'>
    
            {listings.map((listing)=>(
                <ListingItem key={listing.id}  id={listing.id} listing={listing.data} onDelete={()=>onDelete(listing.id)}
                onEdit={()=>onEdit(listing.id)}/>
            ))}
        </ul>
    </div>
    </>
  )
}
