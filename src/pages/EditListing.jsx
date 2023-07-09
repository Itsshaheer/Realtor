import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import{getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {getAuth} from 'firebase/auth'
import {v4 as uuidv4} from 'uuid'
import {addDoc, collection, doc, getDoc, serverTimestamp, updateDoc} from 'firebase/firestore'
import {db} from '../firebase'
import { useNavigate, useParams } from 'react-router-dom';

function EditListing() {
    const [listing, setListing]= useState(false)
    const navigate= useNavigate()
    const auth= getAuth()
    const[geoLocationEnable,setgeoLocationEnable]=useState(false)
    const [formData, setFormData]= useState({
type:'rent',
name:'',
bedrooms:1,
bathrooms:1,
parking:false,
furnished: false,
adress:'',
description:'',
offer: false,
regularPrice:0,
discountPrice:0,
latitude: 0,
longitude:0,
images:{},
    })
    const {
        type,
        name,
        bedrooms,
        bathrooms,
        parking,
        adress,
        furnished,
        description,
        offer,
        regularPrice,
        discountPrice,
        latitude,
        longitude,
        images,
      } = formData;
    
    const params= useParams()
useEffect(()=>{
async function fetchListing(){
    const docRef= doc(db, 'listing',params.listingId)
    const docSnap= await getDoc(docRef)
    if (docSnap.exists()){
setListing(docSnap.data())
setFormData({...docSnap.data(),})
    }
    else {
        navigate('/')
        toast.error('Listing not found')
        
    }

}
fetchListing()
},[navigate,params.listingId])
useEffect(()=>{
if(listing && listing.userRef !== auth.currentUser.uid){
    toast.error('You Cant Edit')
    navigate('/')
}
}, [auth.currentUser.uid, listing, navigate])
    

    function onChange(e){
        let boolean = null;
        if (e.target.value === "true") {
          boolean = true;
        }
        if (e.target.value === "false") {
          boolean = false;
        }
        // Files
        if (e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            images: e.target.files,
          }));
        }
        // Text/Boolean/Number
        if (!e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: boolean ?? e.target.value,
          }));
        }
      
      }

      async function onSubmit(e){
        e.preventDefault()
    
        if(images.length> 6){
            toast.error("Error")
        return
        }
        
        let location
        if(geoLocationEnable){
        
        } else{
           
        } 

        async function storeImage(image) {
            return new Promise((resolve, reject) => {
              const storage = getStorage();
              const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
              const storageRef = ref(storage, filename);
              const uploadTask = uploadBytesResumable(storageRef, image);
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                  reject(error);
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    resolve(downloadURL);
                    
                  });
                }
              );
            });
        }
      
        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
          ).catch((error) => {
            toast.error("Images not uploaded");
            return;
          });
      
       const formDataCopy= {
        ...formData,
        imgUrls,
        
        timestamp: serverTimestamp(),
        userRef: auth.currentUser.uid

       };
       delete formDataCopy.images 
       delete formDataCopy.latitude
       delete formDataCopy.longitude
       !formDataCopy.offer && delete formDataCopy.discountPrice
       const docRef = doc(db, "listing", params.listingId);

       await updateDoc(docRef, formDataCopy);
   
toast.success('Listing Changed')
navigate(`/category/${formDataCopy.type}/${docRef.id}`)

        
    }
  
  
    return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-5xl text-center mt-6 font-bold'>Edit The Listing</h1>
        <form onSubmit={onSubmit}>
            <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
            <div className='flex'>
                <button type='button' id='type' value='sale' onClick={onChange} className={`px-7 py-3 font-medium
                text-md uppercase rounded shadow-md w-full mr-3 ${type=== 'rent' ? 'bg-white text-black': 'bg-slate-600 text-white'}`}> sell</button>
                           <button type='button' id='type' value='rent' onClick={onChange} className={`px-7 py-3 font-medium
                text-md uppercase rounded shadow-md w-full ml-3 ${type=== 'sale' ? 'bg-white text-black': 'bg-slate-600 text-white'}`}>
                    Rent
                </button>
            
            </div>
<p className='text-lg mt-6 font-semibold'>Name</p>
<input type="text" id='name' placeholder='Name' value={name}onChange={onChange} className='w-full px-4 py-2 text-xl text-gray-700
bg-white-border border-gray-300 focus:text-gray-700 mb-6'/>
<div className='flex space-x-6 mb-6'>
    <div>
        <p className='text-lg font-semnibold'>Beds</p>
        <input type='number' id='bedrooms' value={bedrooms} onChange={onChange} min='1' max='50' required className='px-4 py-2 text-xl text-gray-700
        bg-white border border-gray-300 rounded text-center'/>
    </div>
    <div>
        <p className='text-lg font-semnibold'>Baths</p>
        <input type='number' id='bathrooms' value={bathrooms} onChange={onChange} min='1' max='30' required className='px-4 py-2 text-xl text-gray-700
        bg-white border border-gray-300 rounded text-center'/>
    </div>
</div>
<p className='text-lg mt-6 font-semibold'>Parking Spot</p>
            <div className='flex'>
                <button type='button' id='parking' value={true} onClick={onChange} className={`px-7 py-3 font-medium
                text-md uppercase rounded shadow-md w-full mr-3 ${!parking ? 'bg-white text-black': 'bg-slate-600 text-white'}`}> Yes</button>
                           <button type='button' id='parking' value={false} onClick={onChange} className={`px-7 py-3 font-medium
                text-md uppercase rounded shadow-md w-full ml-3 ${parking ? 'bg-white text-black': 'bg-slate-600 text-white'}`}>
                    No
                </button>
            
            </div>
            <p className='text-lg mt-6 font-semibold'>Furnished</p>
            <div className='flex'>
                <button type='button' id='furnished' value={true} onClick={onChange} className={`px-7 py-3 font-medium
                text-md uppercase rounded shadow-md w-full mr-3 ${!furnished ? 'bg-white text-black': 'bg-slate-600 text-white'}`}> Yes</button>
                           <button type='button' id='furnished' value={false} onClick={onChange} className={`px-7 py-3 font-medium
                text-md uppercase rounded shadow-md w-full ml-3 ${furnished ? 'bg-white text-black': 'bg-slate-600 text-white'}`}>
                    No
                </button>
            
            </div>
            <p className='text-lg mt-6 font-semibold'>Adress</p>
<textarea type="text" id='adress' placeholder='Adress' value={adress}onChange={onChange} className='w-full px-4 py-2 text-xl text-gray-700
bg-white-border border-gray-300 focus:text-gray-700 mb-6'/>
{!geoLocationEnable && (
    <div>
        <div>
            <p className='text-lg font-semibold'>Latitude</p>
            <input type='number' id='latitude' value={latitude} onChange={onChange} required className='w-full px-4 py-2 text-xl text-gray-700
           bg-white  border border-gray-300 rounded' />
        </div>
        <div>
            <p className='text-lg font-semibold'>Longitude</p>
            <input type='number' id='longitude' value={longitude} onChange={onChange} required className='w-full px-4 py-2 text-xl text-gray-700
           bg-white  border border-gray-300 rounded' />
        </div>
    </div>
)}
       <p className='text-lg  font-semibold'>Description</p>
<textarea type="text" id='description' placeholder='Description' value={description}onChange={onChange} className='w-full px-4 py-2 text-xl text-gray-700
bg-white-border border-gray-300 focus:text-gray-700 mb-6'/>

 <p className='text-lg  font-semibold'>Offer</p>
            <div className='flex mb-6'>
                <button type='button' id='offer' value={true} onClick={onChange} className={`px-7 py-3 font-medium
                text-md uppercase rounded shadow-md w-full mr-3 ${!offer ? 'bg-white text-black': 'bg-slate-600 text-white'}`}> Yes</button>
                           <button type='button' id='offer' value={false} onClick={onChange} className={`px-7 py-3 font-medium
                text-md uppercase rounded shadow-md w-full ml-3 ${offer? 'bg-white text-black': 'bg-slate-600 text-white'}`}>
                    No
                </button>
            
            </div>
            <div className='flex items-center mb-6' >
                <div className=''>
<p className='text=lg font-semibold'>Regular Price</p>
<div className='flex w-full justify-center items-center space-x-6'>
    <input type="number"  id='regularPrice' value={regularPrice} onChange={onChange} min='50' max='4000000' required
    className='w-full px-4 py-2 text-xl text-gray-700 focus:bg-white text-center'/>
    {type=== 'rent' && (
    <div className=''>
        <p className='text-md w-full whitespace-nowrap'> $/ Month</p>
        </div>


)}

</div>


                </div>
            </div>
            {offer && (
                 <div className='flex items-center mb-6' >
                 <div className=''>
 <p className='text=lg font-semibold'>Discounted Price</p>
 <div className='flex w-full justify-center items-center space-x-6'>
     <input type="number"  id='discountPrice' value={discountPrice} onChange={onChange} min='50' max='4000000' required={offer}
     className='w-full px-4 py-2 text-xl text-gray-700 focus:bg-white text-center'/>
     {type=== 'rent' && (
     <div className=''>
         <p className='text-md w-full whitespace-nowrap'> $/ Month</p>
         </div>
 
 
 )}
 
 </div>
 
 
                 </div>
             </div>
            )}
            <div className='mb-6'>
                <p className='text-lg font-semibold'>Images</p>
    <p className='text-gray-600'> The first image will be the cover (max 6)</p>
    <input type="file"  id='images' onChange={onChange} accept='.jpg,.png,.jpeg' multiple required className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded'/>
            </div>
            <button  type='submit' className='mb-6 w-full px-7 py-3 text-white font-medium bg-blue-600 text-lg uppercase rounded shadow-md hover:bg-blue-900'>Edit Listing</button>
        </form>

    </main>
  )
}

export default EditListing