import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { handleResetStudentSelected } from '@/features/studentSlice';
import Badge from '@/components/app/Badge';
import { Vague } from '@/types/vague';
import { Pen } from 'lucide-react';
import { Student } from '@/types/student';
import { router, useForm } from '@inertiajs/react';
import { H } from 'node_modules/framer-motion/dist/types.d-Cjd591yU';
import Swal from 'sweetalert2';
import { handleUpdateStudentSlice } from '@/features/vagueSlice';

type studentUpdateState = {
    id: number | null;
    name: string;
    status: boolean;
    phone: string;
    vague_id: number | null;
}

type UpdateStudentProps = {
    setOpenMenuId: (id: number | null) => void;
    setSelectedVague: (vague: Vague | null) => void;
    selectedVague: Vague | null;
    setIsOpenModalDetails: (isOpenModalDetails: boolean) => void;
    vagueList: Vague[];
}


export default function UpdateStudent({ setOpenMenuId , setSelectedVague, selectedVague, vagueList , setIsOpenModalDetails}: UpdateStudentProps) {

    const studentSelected = useSelector((state: RootState) => state.students.selected);
    const dispatch = useDispatch();
    const vagues = useSelector((state: RootState) => state.vagues.actifs);
    const form = useForm();
    console.log(vagueList);



    const [studentUpdate, setStudendUpdate] = useState<studentUpdateState | null>({
        id: studentSelected?.id ?? null,
        name: studentSelected?.name ?? '',
        status: studentSelected?.status ?? false,
        phone: studentSelected?.phone ?? '',
        vague_id: studentSelected?.vague_id ?? null,
    });

    const handleUpdateStudent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        form.put(route("admin.student.update", {
            data: studentUpdate
        }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                dispatch(handleResetStudentSelected());
                form.reset();
                setOpenMenuId(null);
                setIsOpenModalDetails(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });

            },
        });
    }


  return (
    <div>
        <div className='flex items-center justify-between'>
            <h3 className='flex items-center gap-2'> <Pen  size={12}/><span>Modifier</span></h3>
            <button onClick={() => dispatch(handleResetStudentSelected())}>
                <Badge icon type="warning">Annuler</Badge>
            </button>
        </div>

        <form onSubmit={handleUpdateStudent} >
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2'>
                <div>
                    <label htmlFor="name">Nom</label>
                    <input
                    value={studentUpdate?.name}
                    onChange={(e) => setStudendUpdate((prev: any) => ({...prev, name: e.target.value}))}
                    type="text" className='form-input' placeholder="Nom" id="name"/>
                </div>
                <div>
                    <label htmlFor="phone">Télephone</label>
                    <input
                    value={studentUpdate?.phone}
                    onChange={(e) => setStudendUpdate((prev: any) => ({...prev, phone: e.target.value}))}
                    type="text" className='form-input' placeholder="Nom" id='phone' />
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2'>
                <div>
                    <label htmlFor="vague">Vague</label>
                    <select
                    onChange={(e) => setStudendUpdate((prev: any) => ({...prev, vague_id: e.target.value}))}
                    name="vague" id="vague" className='form-input'>
                        <option disabled>Sélectionnez une vague</option>
                        {vagues.map((vague: Vague) => {
                           return <option
                           onChange={() => setStudendUpdate((prev: any) => ({...prev, vague_id: vague.id}))}
                           selected={vague.id === studentUpdate?.vague_id} value={vague.id} key={vague.id}>{vague.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <select
                    onChange={(e) => setStudendUpdate((prev: any) => ({...prev, status: e.target.value === 'true'}))}
                    name="status" id="status" className='form-input'>
                       <option value="true" selected={studentUpdate?.status}>Actif</option>
                       <option value="false" selected={!studentUpdate?.status}>Inactif</option>
                    </select>
                </div>
            </div>

            <div className='flex justify-end'>
                <button className='btn-success'>Sauvegarder</button>
            </div>
        </form>
    </div>
  )
}
