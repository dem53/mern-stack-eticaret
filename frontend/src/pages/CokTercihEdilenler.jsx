import React from 'react'
import PageHeader from '../components/PageHeader'
import UrunTercihContent from '../components/UrunTercihContent'
import Footer from '../components/Footer'

function CokTercihEdilenlerPage() {
  return (
    <>
     <div className='flex flex-col'>
        <PageHeader />
        <UrunTercihContent />
        <div className='mt-32'>
        </div>
      </div>
        <Footer />
    </>
  )
}

export default CokTercihEdilenlerPage