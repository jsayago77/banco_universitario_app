import {createHashRouter,RouterProvider} from "react-router-dom"

import SignIn from "../components/signIn"
import SignUp from "../components/signUp"

const main_route = createHashRouter([
    {
        path: "*",
        element: <SignIn />
    },
    {
        path:"/login",
        element:<SignIn />
    },
    {
        path:"/register",
        element:<SignUp />
    }
])

export default function Routers(){     
    return (
        <>
        <RouterProvider router={main_route}/>
        </>
    )  
}