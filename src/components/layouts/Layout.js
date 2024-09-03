import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({children}) {
  return (
    <div>
      <>
      <Navbar/>
      <main className='pt-[5rem]'>{children}</main>
       </>
       <Footer/>
    </div>
    
  )
}

export default Layout
