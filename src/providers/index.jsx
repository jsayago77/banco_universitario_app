import { createHashRouter, RouterProvider, Navigate } from "react-router-dom"
import { Routes, Route, HashRouter } from "react-router-dom";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import AppContainer from "../pages/appContainer";
import Dashboard from "../components/dashboard";
import Movements from "../components/movements";
import NewMovement from "../components/newMovement";
import Contacts from "../components/contacts";
import NewContact from "../components/newContact";
import EditContact from "../components/editContact";
import Sign from "../pages/sign";
import AppSection from "../components/appSection";
import Profile from "../components/profile";

const main_route = createHashRouter([
    {
        path: "/",
        element: <AppSection />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "movements",
                element: <Movements />,
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
                    <Route path="movements" element={<Movements />} />
                    <Route path="new-movement" element={<NewMovement />} />
                    <Route path="contacts" element={<Contacts/>} />
                    <Route path="new-contact" element={<NewContact/>} />
                    <Route path="new-contact/:contactId" element={<NewContact/>} />
                    <Route path="edit-contact/:contactId" element={<EditContact/>} />
                    <Route path="profile" element={<Profile/>} />
                </Route>
                <Route path="/enter" element={<Sign />} >
                    <Route path="login" element={<SignIn />} />
                    <Route path="register" element={<SignUp />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}