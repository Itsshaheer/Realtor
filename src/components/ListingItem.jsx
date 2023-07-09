import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {MdLocationPin} from 'react-icons/md'
import {FaTrash} from 'react-icons/fa'
import {MdEdit} from 'react-icons/md'
function ListingItem({listing,id,onEdit,onDelete}) {
    
  return (
    
   <li className='relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md
   m-[10px]'>
    <Link to={`/category/${listing.type}/${id}`}> 
    <img className='h-[170px] w-full object-cover hover:scale-110' src={listing.imgUrls[0]} loading='lazy'>
    
    </img>
    <Moment fromNow className='absolute top-2 left-3 bg-[#3377cc] text-white uppercase text-sm px-2 py-1 shadow-md rounded-md
    font-semibold'>
             {listing.timestamp?.toDate()}
        </Moment>
        <div className='w-full p-[10px]'>
            <div className='flex items-center space-x-1'>

         <MdLocationPin className='h-4 w-4 text-purple-600' />
         <p className='font-semibold text-sm mb-[2px] text-black-600 truncate'>{listing.adress}</p>
        </div>
        <p className='font-semibold mt-2 text-2xl text-black'>{listing.name}</p>
        <p className='font-semibold mt-2 text-lg text-[#457b9d]'>${listing.offer ? listing.discountPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                   {listing.type === "rent" && " / month"}</p>
                   <div className='flex items-center mt-[10px] space-x-3'>
                    <div className='flex items-center space-x-1'>
                        <p className='font-bold text-md'>{listing.bedrooms> 1 ? `${listing.bedrooms}Beds`: "1 Bed"}</p>
                    </div>
                    <div>
                        <p className='font-bold text-md'>{listing.bathrooms > 1 ? `${listing.bathrooms}Baths`: '1 Bath'}</p>
                    </div>
                    
                   </div>
        </div>
    </Link>
    {onDelete && (
        <FaTrash  className='absolute bottom-2 right-2 h-[18px] cursor-pointer text-red-500' onClick={()=>onDelete
        (listing.id)}/>
    )}
    {onEdit && (
        <MdEdit  className='absolute bottom-2 right-7 h-[18px] cursor-pointer text-black' onClick={()=>onEdit
        (listing.id)}/>
    )}
   </li>
  )
}

export default ListingItem