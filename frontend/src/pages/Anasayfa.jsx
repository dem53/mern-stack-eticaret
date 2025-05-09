import React, { useState } from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import '../App.css'

function AnasayfaPage() {

  const [user, setUser] = useState(null);
  return (
    <>
      <div className='bg-white text-black flex items-center justify-center text-center py-2'>
        <h1 className='font-sans font-semibold tracking-wider'>72 SAATTE KARGO TESLİM!</h1>
      </div>

      <div className='flex flex-col relative'>

        <Header user={user} setUser={setUser} />
        <Main />
        <Footer />
      </div>

    </>
  );
}

export default AnasayfaPage;
