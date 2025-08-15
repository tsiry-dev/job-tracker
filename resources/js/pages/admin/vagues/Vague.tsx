import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Edit, Trash2, Eye, Users, Save, BookUser, CirclePlay, Gauge, Ban, ShieldCheck, ShieldX, User, MoreVertical, MoreHorizontal, X } from 'lucide-react';
import Swal from 'sweetalert2';

import type { Vague } from '@/types/vague';
import type { Level } from '@/types/level';

import AppLayout from '@/layouts/auth/AppLayout';
import Badge from '@/components/app/Badge';
import MainTitle from '@/components/app/MainTitle';
import MainHead from '@/components/app/MainHead';
import Modal from '@/components/app/Modal';
import Overlay from '@/components/app/Overlay';
import FormContent from '@/components/app/FormContent';
import FormContentGroup from '@/components/app/FormContentGroup';
import NewVague from './NewVague';
import PaginationComponent from '@/components/app/Pagination';
import { Student } from '@/types/student';




type PaginationLink = {
    active: boolean;
    label: string;
    url: string | null;
};

type PaginatedVagues = {
    current_page: number;
    data: Vague[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

type VagueProps = {
    vagues: PaginatedVagues;
    levels: Level[]
};

export default function Vague({ vagues , levels}: VagueProps) {

    console.log(vagues);
    console.log(levels);


   const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
   const [selectedVagueIds, setSelectedVagueIds] = useState<number[]>([]);
   const [isOpenModalDetails, setIsOpenModalDetails] = useState(false);
   const [selectedVague, setSelectedVague] = useState<Vague | any>(null);
   const [openMenuId, setOpenMenuId] = useState<number | null>(null);

   const form = useForm();

   const handleCreateVague = () => {
       setIsOpenModalCreate(true);
   }

   const handleCloseModalCreate = () => {
      setIsOpenModalCreate(false);
   }
   const handleCloseModalDetails = () => {
      setIsOpenModalDetails(false);
   }

   const handleSelectVague = (id: number) => {
       if (selectedVagueIds.includes(id)) {
           setSelectedVagueIds(selectedVagueIds.filter((i) => i !== id));
       } else {
           setSelectedVagueIds([...selectedVagueIds, id]);
       }
   }

    const handleShowDetails = (vague: Vague) => {
      setSelectedVague(vague);
      setIsOpenModalDetails(true);
    }

    const handleToogleStatus = (id: number) => {

        form.post(route("admin.student.toggle", id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setSelectedVague((prev: Vague) => ({
                    ...prev,
                    students: prev.students.map((student: Student) =>
                        student.id === id
                            ? { ...student, status: !student.status }
                            : student
                    ),
                }));
                form.reset();
            },
            onError: () => {
                // Tu peux gérer des effets en cas d'erreur
            },
        });
    }


   const handleDestroy = (id : number | null, type: string) => {

        Swal.fire({
            title: "Vous êtes sur de vouloir supprimer ?",
            text: "Cette action est irréversible.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimer",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                if(type === "all") {
                    form.transform((data) => ({
                        ...data,
                        ids: vagues.data.map((vague) => vague.id)
                    }));

                    form.delete(route("admin.vagues.destroy"), {
                        preserveScroll: true,
                        onSuccess: () => setSelectedVagueIds([]),
                    });


                }else if(type === "partial") {

                    if(id === null) {

                        deleteProcess(selectedVagueIds);

                    }else {

                         deleteProcess([id]);

                    }

                }

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Vague supprimée",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });

   }

   const deleteProcess = (dataArr: number[]) => {
        form.transform((data) => ({
            ...data,
            ids: dataArr,
        }));

        form.delete(route("admin.vagues.destroy"), {
            preserveScroll: true,
            onSuccess: () => setSelectedVagueIds([]),
        });
   }

   const handleResetSelected = () => {
       setSelectedVagueIds([]);
   }

   const handleDeleteStudent = (id: number) => {

       Swal.fire({
            title: "Vous êtes sur de vouloir supprimer ?",
            text: "Cette action est irréversible.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimer",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {

                form.delete(route("admin.student.destroy", id), {
                     preserveScroll: true,
                     preserveState: true,
                     onSuccess: () => setSelectedVagueIds([]),
                 });

                setSelectedVague((prev: Vague) => ({
                    ...prev,
                    students: prev.students.filter((student: Student) =>
                        student.id !== id
                    ),
                }));


                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Élève supprimé",
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        });

   }


  return (
    <AppLayout title="Vagues">
      <div>
        <MainHead>
            <MainTitle><Users size={20}/> Vagues</MainTitle>

            <div>
                <button className='btn-success' onClick={handleCreateVague}>Ajouter</button>
            </div>
        </MainHead>

      {selectedVagueIds.length > 0 &&
          <div className='flex gap-2'>
            <div className=' mb-2'>
                <button className='' onClick={() =>handleDestroy(null, 'partial')}>
                    <Badge icon type="error">
                    Supprimer les selectionnés
                    </Badge>
                </button>
            </div>
            <div className=' mb-2'>
                <button className='' onClick={() =>handleDestroy(null, 'all')}>
                    <Badge icon type="error">
                      Supprimer tous
                    </Badge>
                </button>
            </div>
            <div className=' mb-2'>
                <button className='' onClick={() => handleResetSelected()}>
                    <Badge icon type="warning">
                     Annulé
                    </Badge>
                </button>
            </div>
         </div>
      }

       {
         vagues.data.length > 0 ?

            <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                <tr>
                    <th className="text-left px-6 py-3 text-gray-700 font-semibold">Nom</th>
                    <th className="text-left px-6 py-3 text-gray-700 font-semibold">Début</th>
                    <th className="text-left px-6 py-3 text-gray-700 font-semibold">Fin</th>
                    <th className="text-center px-6 py-3 text-gray-700 font-semibold">Status</th>
                    <th className="text-center px-6 py-3 text-gray-700 font-semibold">Élèves</th>
                    <th className="text-center px-6 py-3 text-gray-700 font-semibold">Actions</th>
                </tr>
                </thead>
                <tbody>
                {vagues.data.map((vague) => (
                    <tr key={vague.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium flex gap-2 items-center">
                        <span>
                            <input id={`${vague.id}`} type="checkbox" checked={selectedVagueIds.includes(vague.id)} onChange={() => handleSelectVague(vague.id)} />
                        </span>
                        <label htmlFor={`${vague.id}`}>{vague.name}</label>
                        </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <Badge icon={false} type="success">
                        {new Date(vague.start_date).toLocaleDateString()}
                        </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <Badge icon={false} type="error">
                        {new Date(vague.end_date).toLocaleDateString()}
                        </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                        {vague.status ? (
                        <Badge icon type="success">Actif</Badge>
                        ) : (
                        <Badge icon type="error">Inactif</Badge>
                        )}
                    </td>
                    <td className="px-6 py-4 text-center">{vague?.students?.length  ?? 0}</td>
                    <td className="px-6 py-4 text-center space-x-3">
                        <button
                            aria-label="Voir"
                            className="text-green-600 hover:text-green-800 transition"
                            onClick={() => handleShowDetails(vague)}
                            >
                            <Eye size={16} />
                        </button>
                        <button
                        aria-label="Modifier"
                        className="text-blue-600 hover:text-blue-800 transition"
                        onClick={() => alert(`Modifier la vague ${vague.name}`)}
                        >
                        <Edit size={16} />
                        </button>
                        {
                            selectedVagueIds.length === 0 &&
                                <button
                                onClick={() => handleDestroy(vague.id, 'partial')}
                                aria-label="Supprimer"
                                className="text-red-600 hover:text-red-800 transition"
                                >
                                <Trash2 size={16} />
                                </button>
                        }
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className='m-5 '>
               <PaginationComponent pagination={vagues} />
            </div>
            </div>

         :
            <div className='text-center mt-15'>
                <Badge icon type="warning">
                    Pas de vagues pour le moment
                </Badge>
            </div>
       }


      </div>

     {
         isOpenModalCreate &&
         <>
            <Modal title="Ajouter une nouvelle vague" onCloseModal={handleCloseModalCreate}>
               <NewVague levels={levels} />
            </Modal>
         </>
     }

     {
         isOpenModalDetails &&
         <>
            <Modal title="Détails de la vague" onCloseModal={handleCloseModalDetails}>
               <article className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4'>
                <div >
                   <h2 className='flex gap-2 items-end mb-2'>
                     <Badge icon={false} type="success"><Gauge size={15}/></Badge>
                     <span>{selectedVague?.level.name}</span>
                   </h2>
                   <h2 className='flex gap-2 items-end mb-2'>
                     <Badge icon={false} type="success"><BookUser size={15}/></Badge>
                     <span><strong>Vague: </strong> {selectedVague?.name}</span>
                   </h2>
                   <h2 className='flex gap-2 items-end mb-2'>
                     <Badge icon={false} type="success"><CirclePlay size={15}/></Badge>
                     <span><strong>Début: </strong> {selectedVague?.start_date}</span>
                   </h2>
                   <h2 className='flex gap-2 items-end mb-2'>
                     <Badge icon={false} type="error"><Ban  size={15}/></Badge>
                     <span><strong>Fin: </strong> {selectedVague?.end_date ?? 'Non défini'}</span>
                   </h2>
                   <h2 className='flex gap-2 items-end mb-2'>
                     <Badge icon={false} type={`${selectedVague?.status ? 'success' : 'error'}`}>
                        {selectedVague?.status ? <ShieldCheck size={15}/> : <ShieldX size={15}/>}
                     </Badge>
                     <span><strong>Status: </strong>{selectedVague?.status ? 'Actif' : 'Plus actif'}</span>
                   </h2>
                </div>

                <div className=''>
                   <h2 className='flex gap-2 items-end'><Users /> <span>eleves  <strong>({selectedVague?.students?.length ?? 0})</strong></span></h2>

                   <ul className='mt-3'>
                     {
                         selectedVague.students.length > 0 ?
                            selectedVague.students
                            // .sort((a: Student , b: Student) => a.status < b.status ? 1 : -1)
                            .map((student: Student) => (
                                <li key={student.id} className='border-1 hover:bg-cyan-700 hover:text-white hover:border-gray-400 border-gray-400 transition flex items-center gap-1 justify-between bg-gray-100 p-1 mb-2 rounded-lg'>
                                    <div className='flex gap-1'>
                                        <User size={15} />
                                        <span>{student.name} </span>
                                    </div>
                                    <div className='flex gap-1'>
                                        <span
                                            className='cursor-pointer'
                                            onClick={() => handleToogleStatus(student.id)}
                                        >
                                            {student.status ?
                                            <Badge icon type="success">Actif</Badge>
                                            :

                                            <Badge icon type="error">Inactif</Badge>
                                        }
                                        </span>

                                         <div>
                                            <div className="relative">
                                                <button
                                                onClick={() =>
                                                    setOpenMenuId(openMenuId === student.id ? null : student.id)
                                                }
                                                className="p-1 rounded hover:bg-gray-200 hover:text-gray-900 transition"
                                                >
                                                {
                                                    openMenuId === student.id ?
                                                        <X size={16} />
                                                    :

                                                    <MoreHorizontal size={16} />
                                                }
                                                </button>

                                                {openMenuId === student.id && (
                                                <ul className="absolute right-0 mt-1 flex bg-gray-100 border hover:border-gray-600 rounded shadow-md z-50">
                                                    <li
                                                    onClick={() => handleDeleteStudent(student.id)}
                                                    className="px-3 py-2 hover:bg-white cursor-pointer text-red-500">
                                                        <Trash2 size={16} />
                                                    </li>
                                                    <li className="px-3 py-2 hover:bg-white cursor-pointer text-green-500">
                                                        <Edit size={16} />
                                                    </li>
                                                    <li className="px-3 py-2 hover:bg-white cursor-pointer text-blue-500">
                                                        <Link href={route("admin.student.show", student.slug)} className="text-blue-600 hover:text-blue-800 transition">
                                                            <Eye size={16} />
                                                        </Link>
                                                    </li>
                                                </ul>
                                                )}
                                            </div>
                                         </div>
                                    </div>
                                </li>
                            ))
                         :
                         <div className='text-center my-10'>
                            <Badge icon type="warning">
                                Pas d'élèves pour le moment!!
                            </Badge>
                         </div>
                     }
                   </ul>
                </div>
               </article>
            </Modal>
         </>
     }

     {isOpenModalCreate && <Overlay onClick={handleCloseModalCreate} />}
     {isOpenModalDetails && <Overlay onClick={handleCloseModalDetails} />}

    </AppLayout>
  );
}
