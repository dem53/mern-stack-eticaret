import React from 'react'
import PageHeader from '../components/PageHeader'
import HakkımızdaContent from '../components/HakkimizdaContent'
import Footer from '../components/Footer'

function HakkımızdaPage() {
  return (
    <>
      <div className='flex flex-col'>
        <PageHeader />
        <HakkımızdaContent />
        <Footer />
      </div>
    </>
  )
}

export default HakkımızdaPage