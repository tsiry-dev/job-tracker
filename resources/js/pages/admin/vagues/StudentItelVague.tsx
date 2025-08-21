import type { Student } from '@/types/student';
import { User, MoreHorizontal, X, Trash2, Edit, Eye, Info } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Badge from '@/components/app/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { handleStudentSelected } from '@/features/studentSlice';
import { selectedStudentDetailHandler } from '@/features/vagueSlice';


type StudentItemProps = {
   student: Student;
   handleToogleStatus: (id: number) => void;
   handleDeleteStudent: (id: number) => void;
   setOpenMenuId: (id: number | null) => void;
   openMenuId: number | null;
}

export default function StudentItelVague( { student, handleToogleStatus, handleDeleteStudent, setOpenMenuId, openMenuId }: StudentItemProps) {

    const dispatch = useDispatch();

   const handleSelectedStudentDetail = (student: Student | null) => {
      dispatch(selectedStudentDetailHandler(student));

   }


  return (
    <li  className='border-1 hover:bg-cyan-700 hover:text-white hover:border-gray-400 border-gray-400 transition flex items-center gap-1 justify-between bg-gray-100 p-1 mb-2 rounded-lg'>
            <div className='flex gap-1'>
                <User size={15} />
                <span>{student.name}</span>
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
                            title='Supprimer'
                            onClick={() => handleDeleteStudent(student.id)}
                            className="px-3 py-2 hover:bg-white cursor-pointer text-red-500">
                                <Trash2 size={16} />
                            </li>
                            <li
                            title='Modifier'
                            onClick={() => dispatch(handleStudentSelected(student))}
                            className="px-3 py-2 hover:bg-white cursor-pointer text-green-500">
                                <Edit size={16} />
                            </li>
                            <li
                            title='Detail'
                            onClick={() => handleSelectedStudentDetail(student)}
                            className="px-3 py-2 hover:bg-white cursor-pointer text-blue-500">
                                <span className="text-blue-600 hover:text-blue-800 transition">
                                    <Eye size={16} />
                                </span>
                            </li>
                            <li
                            title='Plus de détails'
                            className="px-3 py-2 hover:bg-white cursor-pointer text-yellow-500">
                                <Link href={route("admin.student.show", student.slug)} className="text-yellow-600 hover:text-blue-800 transition">
                                    <Info size={16} />
                                </Link>
                            </li>
                        </ul>
                        )}
                    </div>
                    </div>
            </div>
        </li>
  )
}
