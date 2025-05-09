import React from 'react'
import PageHeader from '../components/PageHeader'
import UrunYeniGelenContent from '../components/UrunYeniGelenContent'
import Footer from '../components/Footer'

function YeniGelenler() {
  return (
    <>
      <div className='flex flex-col'>
        <PageHeader />
        <UrunYeniGelenContent />
        <div className='mt-32'>
        </div>
      </div>
      <Footer />

    </>
  )
}

export default YeniGelenler