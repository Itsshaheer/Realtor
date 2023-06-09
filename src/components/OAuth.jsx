import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import {FcGoogle} from 'react-icons/fc'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick(){
try {
  const auth= getAuth()
const provider= new GoogleAuthProvider()
provider.setCustomParameters({
  'prompt': 'select_account'
})
const result = await signInWithPopup(auth, provider)
const user= result.user
const docRef= doc(db,"users", user.uid)
const docSnap= await getDoc(docRef)
if(!docSnap.exists()){
await setDoc(docRef,{
  name:user.displayName, email:user.email,
  timestamp: serverTimestamp()
})
}
navigate('/')
  
} catch (error) {
  toast.error('Error')
}
  }
  return (
    <button type='button' onClick={onGoogleClick} className='flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800
    active:bg-red-900 rounded'> <FcGoogle className='text-2xl bg-white rounded-full mr-2'/> Continue With Google</button>
  )
}

export default OAuth