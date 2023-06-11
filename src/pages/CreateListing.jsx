import React, { useState } from 'react'

function CreateListing() {
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
discountPrice:0
    })
    function onChange(){

    }
    const {type,name,bedrooms,bathrooms,parking,furnished,adress,description,offer,regularPrice,discountPrice}=formData
  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-5xl text-center mt-6 font-bold'>Create A Listing</h1>
        <form>
            <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
            <div className='flex'>
                <button type='button' id='type' value='sale' onClick={onChange} className={`px-7 py-3 font-medium
                text-md uppercase rounded shadow-md w-full mr-3 ${type=== 'rent' ? 'bg-white text-black': 'bg-slate-600 text-white'}`}> sell</button>
                           <button type='button' id='type' value='sale' onClick={onChange} className={`px-7 py-3 font-medium
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
                           <button type='button' id='parking' value='sale' onClick={onChange} className={`px-7 py-3 font-medium
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
            <button type='submit' className='mb-6 w-full px-7 py-3 text-white font-medium bg-blue-600 text-lg uppercase rounded shadow-md hover:bg-blue-900'>Create Listing</button>
        </form>

    </main>
  )
}

export default CreateListing