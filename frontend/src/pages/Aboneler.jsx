import React from 'react'
import PageHeader from '../components/PageHeader'
import AbonelerContent from '../components/AbonelerContent'

function AbonelerPage() {
  return (
    <>
        <div className='flex flex-col gap-7'>
            <PageHeader />
            <AbonelerContent />
        </div>
    </>
  )
}

export default AbonelerPage