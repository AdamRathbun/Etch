import React from 'react';
import { Container } from '@material-ui/core'
// Switch is now Routes
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth';
// import PostDetails
import PostDetails from './components/PostDetails/PostDetails';

export default function App() {

    return (
        // BrowserRoute is the React router
        <BrowserRouter>
            <Container maxwidth='lg'>
                <Navbar />
                <Routes>
                    {/* Home route, see ln 6. also, replaced exact component={Home} with element={<Home />} */}
                    <Route path='/' element={<Home />}/>
                    <Route path='/auth' element={<Auth />}/>
                    <Route path='/posts/:id' element={<PostDetails />}/>
                </Routes>
        </Container>
        </BrowserRouter>

    )
}