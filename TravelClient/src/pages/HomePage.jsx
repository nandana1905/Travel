import React from 'react'
import './HomePage.css'
import NavBar from '../component/NavBar'

export default function HomePage() {
    return (
        <div>
            <div>
                <NavBar />
                <div className='img-homepage'>
                    <div className='homecontent'>
                        <div>
                            <button className="boton-elegante">Book with us!</button>
                        </div>
                        <div>
                            <h1  className='headhomepage'>Find Next Place <br/> To <span className='spanhomepage'>Visit</span> </h1> 
                        </div>
                    </div>
                    <div className='img-homepage2'></div>
                </div>
            </div>
        </div>
    )
}
