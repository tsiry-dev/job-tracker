import React, { useEffect, useState } from 'react';
import { Edit, Gauge, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/auth/AppLayout';
import MainTitle from '@/components/app/MainTitle';
import MainHead from '@/components/app/MainHead';
import { RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalHandler, getLevelHandler, openModalHandler } from '@/features/levelSlice';
import Modal from '@/components/app/Modal';
import Overlay from '@/components/app/Overlay';
import { useForm } from '@inertiajs/react';
import LevelCreate from './LevelCreate';
import type { Level } from '@/types/level';
import Swal from 'sweetalert2';

type LevelProps = {
    levels: Level[];
}

export default function Level({levels}: LevelProps) {

  const isOpenModal = useSelector((state: RootState) => state.levels.isOpenModal);
  const levelsList = useSelector((state: RootState) => state.levels.lists);
  const dispatch = useDispatch();

  const form = useForm();

  useEffect(() => {
      dispatch(getLevelHandler(levels));
  }, [levels])

  const handleOpenModal = () => {
       dispatch(openModalHandler());
  };

  const handleCloseModal = () => {
      dispatch(closeModalHandler());
  };

  const handleRemove = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                form.delete(route('admin.levels.destroy', {
                    id: id
                }), {
                    preserveScroll: true,
                    onSuccess: () => {

                    }
                });
            }
        });

  }


  return (
    <AppLayout title="Levels">
      <div className="">
        <MainHead>
          <MainTitle><Gauge size={20}/> Niveaux</MainTitle>

           <div>
               <button onClick={handleOpenModal} className='btn-success'>Ajouter</button>
           </div>
        </MainHead>


        <div className="hidden lg:block overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">Niveaux</th>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">Vagues</th>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">Modules</th>
                <th className="text-center px-6 py-3 text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
               {
                  levelsList.map((level: Level) => {
                      return (
                            <tr
                               key={level.id}
                                className="border-b last:border-b-0 hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 whitespace-nowrap font-medium">
                                    {level?.name ?? 'Not found'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {level?.vagues?.length ?? 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {level?.modules?.length ?? 0}
                                </td>

                                <td className="px-6 py-4 text-center space-x-3">
                                <button
                                    aria-label="Modifier"
                                    className="text-blue-600 hover:text-blue-800 transition"
                                >
                                    <Edit size={15} />
                                </button>
                                <button
                                    onClick={() => handleRemove(level.id)}
                                    aria-label="Supprimer"
                                    className="text-red-600 hover:text-red-800 transition"
                                >
                                    <Trash2 size={15} />
                                </button>
                                </td>
                            </tr>
                      )
                  })
               }

            </tbody>
          </table>
        </div>
      </div>

      {isOpenModal &&
         <>
            <Modal onCloseModal={handleCloseModal} title="Ajouter un niveau">
                <LevelCreate />
            </Modal>
            <Overlay onClick={handleCloseModal} />
         </>
      }




    </AppLayout>
  );
}
