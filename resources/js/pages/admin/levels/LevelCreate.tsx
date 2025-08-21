import FormContent from '@/components/app/FormContent'
import FormContentGroup from '@/components/app/FormContentGroup'
import { useForm } from '@inertiajs/react';
import React from 'react'
import Swal from 'sweetalert2';

export default function LevelCreate() {

    const form = useForm({
        name: "",
        description: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(route("admin.levels.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Ajout avec succès",
                    showConfirmButton: false,
                    timer: 2000
                });
                form.reset();
            },
            onError: () => {

            },
        });
    }

  return (
    <form onSubmit={handleSubmit}>
        <FormContentGroup>
            <FormContent label="name" name="name">
                <input
                   value={form.data.name}
                   onChange={(e) => form.setData("name", e.target.value)}
                   type="text" className='form-input' id='name' placeholder="Nom du niveau"/>
                   {form.errors.name && (
                      <div className="text-red-600 mt-1">{form.errors.name}</div>
                   )}
            </FormContent>
            <FormContent label="description" name="description">
                <textarea
                value={form.data.description}
                onChange={(e) => form.setData("description", e.target.value)}
                className='form-input' rows={1} id='description' placeholder="Description du niveau"></textarea>
                {form.errors.description && (
                    <div className="text-red-600 mt-1">{form.errors.description}</div>
                )}
            </FormContent>
        </FormContentGroup>
        <div className="">
            <button className='btn-success'>
                Sauvegarder
            </button>
        </div>
    </form>
  )
}
