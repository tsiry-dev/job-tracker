import { RootState } from '@/app/store';
import FormContent from '@/components/app/FormContent'
import { useForm } from '@inertiajs/react'
import React, { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export default function VagueCreateStudent() {

  const vague = useSelector((state: RootState) => state.vagues.selectedVague);

  const form = useForm({
    vague_id: vague?.id ?? null,
    name: '',
    phone: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>  {
    e.preventDefault();

    form.post(route('admin.student.store', {
        name: form.data.name,
        phone: form.data.phone,
    }), {
        onSuccess: () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Votre étudiant a bien été créé",
                showConfirmButton: false,
                timer: 1500
            });
            form.reset();
        },
        onError: () => {},
    })

  }

  return (
    <div>
        <form onSubmit={handleSubmit} >
            <FormContent label="Nom" name="name">
                <input
                 value={form.data.name}
                 onChange={(e) => form.setData('name', e.target.value)}
                 type="text" className='form-input' placeholder="Nom" name='name'/>
                 {form.errors.name && <span className='text-red-500'>{form.errors.name}</span>}
            </FormContent>
            <FormContent label="Télephone" name="phone">
                <input
                value={form.data.phone}
                onChange={(e) => form.setData('phone', e.target.value)}
                type="text" id='phone' name='phone' className='form-input' placeholder="Télephone"/>
                {form.errors.phone && <span className='text-red-500'>{form.errors.phone}</span>}
            </FormContent>
            <div className='flex justify-end'>
                <button className='btn-success'>Sauvegarder</button>
            </div>
        </form>
    </div>
  )
}
