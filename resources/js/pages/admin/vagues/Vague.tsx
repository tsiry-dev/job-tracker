import React, { useEffect, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Edit, Trash2, Eye, Users, Save, BookUser, CirclePlay, Gauge, Ban, ShieldCheck, ShieldX, User, MoreVertical, MoreHorizontal, X, Plus } from 'lucide-react';
import Swal from 'sweetalert2';

import type { Vague, Module } from '@/types/vague';
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
import StudentItelVague from './StudentItelVague';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { handleResetStudentSelected } from '@/features/studentSlice';
import UpdateStudent from './UpdateStudent';
import { closeCreateStudentHandler, createStudentHandler, removeSelectedStudentDetail, setActif, setVague } from '@/features/vagueSlice';
import { handleSelectedVague } from '@/features/vagueSlice';
import VagueCreateStudent from './VagueCreateStudent';
import VagueStudentDetail from './VagueStudentDetail';




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

type ModuleValue = 0 | 1 | 2;

type ModuleStatus = {
    label: string;
    value: ModuleValue;
}

export default function Vague({ vagues , levels}: VagueProps) {

    // console.log(vagues);
    const dispatch = useDispatch();


   const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
   const [selectedVagueIds, setSelectedVagueIds] = useState<number[]>([]);
   const [isOpenModalDetails, setIsOpenModalDetails] = useState(false);
   const [selectedVague, setSelectedVague] = useState<Vague | any>(null);
   const [openMenuId, setOpenMenuId] = useState<number | null>(null);
   const [selectedStudent, setSelectedStudent] = useState<Student | any>(null);

   const studentSelected = useSelector((state: RootState) => state.students.selected);
   const vagueList = useSelector((state: RootState) => state.vagues.vagues);
   const selectedVagueItem = useSelector((state: RootState) => state.vagues.selectedVague);
   const isCreateStudent = useSelector((state: RootState) => state.vagues.isCreateStudent);
   const selectedStudenDetail = useSelector((state: RootState) => state.vagues.selectedStudentDetail);

   const MODULE_STATUS: ModuleStatus[] = [
       { label: 'En attente', value: 0 },
       { label: 'En cours', value: 1 },
       { label: 'Terminé', value: 2 }
   ];

   const moduleStatusBgColor = (module: Module) => {
      const status = +module.status;
      switch (status) {
         case 0:
            return 'bg-yellow-500';
         case 1:
            return 'bg-green-500';
         case 2:
            return 'bg-blue-500';
         default:
            return 'bg-gray-500';
      }
   }

   console.log(selectedVagueItem);


   useEffect(() =>  {
      dispatch(
        setActif(
            vagues.data.filter((vague: Vague) => vague.status)
        )
      )
      dispatch(setVague(vagues.data))
      dispatch(handleSelectedVague(
          vagues.data.find((vague: Vague) => vague.id === selectedVagueItem?.id)
      ))
   }, [vagues]);


   const form = useForm();

   const handleCreateVague = () => {
       setIsOpenModalCreate(true);
   }

   const handleCloseModalCreate = () => {
      setIsOpenModalCreate(false);
   }

   const resetIfCloseModal = () => {
      setIsOpenModalDetails(false);
      dispatch(handleSelectedVague(null));
      dispatch(closeCreateStudentHandler());
      setOpenMenuId(null);
      dispatch(handleResetStudentSelected());
      dispatch(removeSelectedStudentDetail());
   }

   const handleCloseModalDetails = () => {
      resetIfCloseModal();
   }

   const handleSelectVague = (id: number) => {
       if (selectedVagueIds.includes(id)) {
           setSelectedVagueIds(selectedVagueIds.filter((i) => i !== id));
       } else {
           setSelectedVagueIds([...selectedVagueIds, id]);
       }
   }

    const handleShowDetails = (vague: Vague) => {
      dispatch(handleSelectedVague(vague))
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

   //STUDENTS
   const handleCreateStudent = () => {
       dispatch(createStudentHandler());
   }

   const handleCloseCreateStudent = () => {
       dispatch(closeCreateStudentHandler());
   }

   //MODULES
   const handleUpdateModuleStatus = () => {

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
                {vagueList.map((vague) => (
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

                   <div className='p-2 mt-3'>
                      {selectedVague?.modules.length > 0 &&
                      <>
                        <div className='bg-gray-300 border-1 border-gray-400 my-2 rounded-2xl relative overflow-hidden h-[1.5rem]'>
                            <div className='absolute top-0 left-0 bg-yellow-400 w-[40%] h-full flex justify-end'><span>15%</span></div>
                        </div>
                        <ul>
                            {selectedVague?.modules.map((module: Module) => (
                                <li key={module.id} className='bg-blue-100 p-2 border-1 border-gray-400 flex gap-2 items-center justify-between mb-2'>
                                    <div>{module.name}</div>
                                    <div>
                                        <select
                                        defaultValue={module.status}
                                        name="status" id="status" className={`${moduleStatusBgColor(module)} p-1 rounded-sm`}>
                                            {MODULE_STATUS.map((status: ModuleStatus) => (
                                                <option
                                                    value={status.value}
                                                    key={status.value}>
                                                        {status.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </li>
                            ))}
                        </ul>
                      </>
                      }
                   </div>
                </div>

                <div className='student-list'>
                  {selectedStudenDetail ?
                  <>
                     <VagueStudentDetail />
                  </>
                  :
                  <>
                      {studentSelected ?
                          <UpdateStudent
                               setOpenMenuId={setOpenMenuId}
                               setSelectedVague={setSelectedVague}
                               selectedVague={selectedVague}
                               setIsOpenModalDetails={setIsOpenModalDetails}
                               vagueList={vagueList}
                        />
                      :
                        <div>
                            <div className='flex gap-2 items-center justify-between'>
                              <h2 className='flex gap-2 items-end'>
                                   <Users />
                                   {isCreateStudent ?
                                    <span>Ajouter un nouvelle élève</span>
                                   :

                                   <span>eleves<strong>({selectedVague?.students?.length ?? 0})</strong></span>
                                   }
                              </h2>

                              <div>
                                {isCreateStudent ?

                                    <button
                                        onClick={handleCloseCreateStudent}
                                        className='bg-primary p-1 rounded-sm cursor-pointer'>
                                       <X  size={15} color='white'/>
                                    </button>
                                 :
                                    <button
                                        onClick={handleCreateStudent}
                                        className='bg-primary p-1 rounded-sm cursor-pointer'>
                                        <Plus size={15} color='white'/>
                                    </button>
                                }

                              </div>
                            </div>

                           <div className='mt-3'>
                            {!isCreateStudent ?
                                <ul className=''>
                                    {
                                        selectedVagueItem?.students.length ?? 0 > 0 ?
                                            selectedVagueItem?.students
                                            // .sort((a: Student , b: Student) => a.status < b.status ? 1 : -1)
                                            .map((student: Student) => (
                                            <StudentItelVague
                                                key={student.id}
                                                student={student}
                                                handleToogleStatus={handleToogleStatus}
                                                handleDeleteStudent={handleDeleteStudent}
                                                setOpenMenuId={setOpenMenuId}
                                                openMenuId={openMenuId}
                                            />
                                            ))
                                        :
                                        <div className='text-center my-10'>
                                            <Badge icon type="warning">
                                                Pas d'élèves pour le moment!!
                                            </Badge>
                                        </div>
                                    }
                                </ul>
                            :
                                <VagueCreateStudent />
                            }
                           </div>


                        </div>
                      }
                  </>
                  }

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
