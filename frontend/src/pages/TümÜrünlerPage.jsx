import React from 'react'
import UrunContent from '../components/UrunContent';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';

function TümÜrünlerPage() {
  return (

    <>
      <div className='flex flex-col'>
        <PageHeader />
        <UrunContent />
        <div className='mt-32'>
        </div>
      </div>
        <Footer />
    </>
  )
}

export default TümÜrünlerPage