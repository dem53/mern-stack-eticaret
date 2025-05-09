import React from 'react'

function HavaleBox({ tittle, bankName, names, ıban, hesapNo, subeNo, odemeTutar }) {
    return (
        <div>
            <div className='flex flex-col items-start justify-start gap-4 text-base  p-5 w-full shadow-2xl rounded-md border-black'>
                <p className='font-sans font-semibold w-full border-b pb-2'>Havale Yapılacak Hesap Bilgisi</p>
                <p className='font-medium font-sans w-full text-start text-base mt-1 pb-1'> - {tittle}</p>
                <p className='flex w-full text-sm items-center gap-2'><span className='font-sans font-extrabold'>Banka Adı: </span>{bankName}</p>
                <p className='flex w-full text-sm  items-center gap-2'><span className='font-sans font-extrabold'>ALICI UNVANI: </span>{names}</p>
                <p className='flex w-full text-sm  items-center gap-2'><span className='font-sans font-extrabold'>IBAN NO: </span>{ıban}</p>
                <p className='flex w-full text-sm  items-center gap-2'><span className='font-sans font-extrabold'>HESAP NO:</span>{hesapNo}</p>
                <p className='flex w-full text-sm  items-center gap-2'><span className='font-sans font-extrabold'>ŞUBE KODU: </span>{subeNo}</p>
      
            </div>
        </div>
    )
}

export default HavaleBox