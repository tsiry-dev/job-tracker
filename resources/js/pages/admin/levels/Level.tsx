import React, { useState } from 'react';
import { Edit, Gauge, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/auth/AppLayout';
import MainTitle from '@/components/app/MainTitle';
import MainHead from '@/components/app/MainHead';

type LevelType = {
  id: number;
  title: string;
  waveCount: number;
};

const data: LevelType[] = [
  { id: 1, title: 'Beginner', waveCount: 3 },
  { id: 2, title: 'Intermediate', waveCount: 5 },
  { id: 3, title: 'Advanced', waveCount: 2 },
  // Add more levels if needed
];

export default function Level() {
  const [levels, setLevels] = useState<LevelType[]>(data);

  const handleDelete = (id: number) => {
    if (confirm('Do you really want to delete this level?')) {
      setLevels((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const handleEdit = (level: LevelType) => {
    alert(`Edit level "${level.title}"`);
  };

  return (
    <AppLayout title="Levels">
      <div className="">
        <MainHead>
          <MainTitle><Gauge size={20}/> Niveaux</MainTitle>

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
  );
}
