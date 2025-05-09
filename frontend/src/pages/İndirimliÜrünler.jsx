import React from 'react'
import PageHeader from '../components/PageHeader'
import UrunİndirimContent from '../components/UrunİndirimContent'
import Footer from '../components/Footer'

function İndirimliÜrünlerPage() {
  return (
    <>
       <div className='flex flex-col'>
        <PageHeader />
        <UrunİndirimContent />
        <div className='mt-32'>
        </div>
      </div>
        <Footer />
    </>
  )
}

export default İndirimliÜrünlerPage