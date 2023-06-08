import { getAuth,sendPasswordResetEmail } from 'firebase/auth'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

export default function ForgotPassword() {

    const [email, setEmail]=useState('')
    
    function onChange(e){
        setEmail(e.target.value)
    }
    async function onSubmit(e){
e.preventDefault()
try {
    const auth=getAuth()
    await sendPasswordResetEmail(auth,email)
    toast.success('Sent Email!')
} catch (error) {
    toast.error('Error')
}
    }
  return (
   <section className="border border-red-500 h-screen">
    <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
    <div className='flex justify-center '>
        <form onSubmit={onSubmit}>
            <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6' type='email' id='email'  value={email} placeholder='Email'onChange={onChange}/>
            
           
             <div className='flex justify-between sm:text-lg'>
                <p className='w-full mb-6'>Don't have an account?
                <Link to='/sign-up' className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out'> Register</Link> </p>
                <p className='w-60 text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'><Link to='/sign-in'>Sign In Instead</Link></p>
             </div>
             <div className='flex justify-center '>
    <button className='w-96 bg-blue-600 text-white px-7 py-3 uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out' type='submit'>Send Reset Password Email</button> </div>
  <div className='my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t flex after:flex-1 items-center after:border-gray-300'>
    <p className='text-center font-semibold mx-4'>OR</p>
  </div> 
  <OAuth/>
        </form>

    </div>
    
   </section>



  
  )
}
