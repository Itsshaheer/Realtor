import { Outlet, Navigate } from "react-router"
import UseAuthStatus from "../hooks/UseAuthStatus"



function PrivateRoute() {
    const {loggedIn, checkingStatus}=UseAuthStatus()
    if(checkingStatus){
        return <h1>Loading</h1>
    }
    return loggedIn ? <Outlet/> : <Navigate to='/sign-in' />
    

}

export default PrivateRoute