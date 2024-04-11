import { createHashRouter, RouterProvider, Navigate } from "react-router-dom"
import { Routes, Route, HashRouter } from "react-router-dom";

import SignIn from "../components/signIn"
import SignUp from "../components/signUp"
import AppContainer from "../pages/appContainer"
import Dashboard from "../components/dashboard"
import Sign from "../pages/sign"
import AppSection from "../components/appSection";

const main_route = createHashRouter([
    {
        path: "/",
        element: <AppSection />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/enter",
        element: <Sign />,
        children: [
            {
                path: "login",
                element: <SignIn />,
            },
            {
                path: "register",
                element: <SignUp />
            }
        ],
    }
])

export default function Routers() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<AppContainer />} >
                    <Route index element={<Dashboard />} />
                </Route>
                <Route path="/enter" element={<Sign />} >
                    <Route path="login" element={<SignIn />} />
                    <Route path="register" element={<SignUp />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}