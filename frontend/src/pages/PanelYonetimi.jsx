import React from 'react'
import PageHeader from '../components/PageHeader'
import PanelYonetimiContent from '../components/PanelYonetimiContent'

function PanelYonetimi() {
  return (
    <>
      <div className='flex flex-col gap-10'>
        <PageHeader />
        <PanelYonetimiContent />
      </div>

    </>
  )
}

export default PanelYonetimi