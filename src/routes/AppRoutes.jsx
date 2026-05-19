import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from "../layouts/MainLayout"

import Home from "../Page/Home"
import About from "../Page/About"
import Courses from "../Page/Courses"
import Contact from "../Page/Contact"
import NotFound from "../Page/NotFound"
import Historys from '../Page/Historys'
import Teachers from '../Page/Teachers'
import Licenses from '../Page/Licenses'


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='courses' element={<Courses />} />
                <Route path='contact' element={<Contact />} />
                <Route path='history' element={<Historys />} />
                <Route path='teacher' element={<Teachers />} />
                <Route path='license' element={<Licenses />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
