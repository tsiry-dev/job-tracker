import React from 'react'

type OverlayProps = {
    onClick: () => void;
}

export default function Overlay({ onClick }: OverlayProps) {
  return (
    <div  onClick={onClick} className='fixed rounded-sm p-4 top-0 w-full h-full left-0  bg-[#1918188c] shadow-2xl  bg-opacity-50 z-9 flex justify-center items-center'>

    </div>
  )
}
