import {FcGoogle} from 'react-icons/fc'


function OAuth() {
  return (
    <button className='flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800
    active:bg-red-900 rounded'> <FcGoogle className='text-2xl bg-white rounded-full mr-2'/> Continue With Google</button>
  )
}

export default OAuth