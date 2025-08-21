import { RootState } from '@/app/store';
import Badge from '@/components/app/Badge'
import { removeSelectedStudentDetail } from '@/features/vagueSlice';
import { Info, MoveLeft, Phone, ShieldCheck, User } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function VagueStudentDetail() {

  const dispatch = useDispatch();
  const student = useSelector((state: RootState) => state.vagues.selectedStudentDetail);

  return (
    <div>
          <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-2'> <Info  size={20}/><span>Information</span></h3>
            <button onClick={() => dispatch(removeSelectedStudentDetail())} className=''>
                <Badge icon={false} type="warning">
                    <MoveLeft size={15} color='black'/>
                </Badge>
            </button>
        </div>

        <div className='mt-3'>
            <div className='flex gap-2 items-center mb-2'>
                <Badge icon={false} type="success"><ShieldCheck size={15}/></Badge>
                <span>{student?.status ? 'Actif' : 'Inactif'}</span>
            </div>
            <div className='flex gap-2 items-center mb-2'>
                <Badge icon={false} type="success"><User size={15}/></Badge>
                <span>{student?.name ?? 'Non défini'}</span>
            </div>
            <div className='flex gap-2 items-center mb-2'>
                <Badge icon={false} type="success"><Phone size={15}/></Badge>
                <span>{student?.phone ?? 'XXX XXX XXXX'}</span>
            </div>
        </div>
    </div>
  )
}
