import MainHead from '@/components/app/MainHead';
import MainTitle from '@/components/app/MainTitle';
import AppLayout from '@/layouts/auth/AppLayout';
import { Edit, Gauge, Trash2 } from 'lucide-react';

export default function Modules() {
  return <AppLayout title="Modules">
      <div className="">
        <MainHead>
          <MainTitle><Gauge size={20}/> Modules</MainTitle>

           <div>
               <button className='btn-success'>Ajouter</button>
           </div>
        </MainHead>


        <div className="hidden lg:block overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">Niveaux</th>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">Modules</th>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">Vagues</th>
                <th className="text-center px-6 py-3 text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
                  <tr
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Niveaux 01</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">4-6</td>
                    <td className="px-6 py-4 whitespace-nowrap">15</td>

                    <td className="px-6 py-4 text-center space-x-3">
                      <button
                        aria-label="Modifier"
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        aria-label="Supprimer"
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
            </tbody>
          </table>
        </div>
      </div>
  </AppLayout>
}
