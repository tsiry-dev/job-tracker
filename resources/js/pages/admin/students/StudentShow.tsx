import MainHead from "@/components/app/MainHead";
import MainTitle from "@/components/app/MainTitle";
import AppLayout from "@/layouts/auth/AppLayout";
import { Gauge, Pen, Phone, User, Users } from "lucide-react";
import type { Student } from '@/types/student';
import Badge from "@/components/app/Badge";



type StudentShowProps = {
    student: Student
}

export default function StudentShow( {student}: StudentShowProps) {

    console.log(student.vague);


  return (
    <AppLayout title="StudentShow">
      <div className="px-4 py-6">
        <MainHead>
            <MainTitle><User size={20}/>{student.name}</MainTitle>

            <div>
                <button className='btn-success'> Retour</button>
            </div>
        </MainHead>

        {/* Grille responsive: 1 col (mobile), 2 cols (md), 3 cols (lg+) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-end">
                <span className='h-7 w-7 flex items-center justify-center rounded-sm bg-primary cursor-pointer'>
                    <Pen size={15} color="white"/>
                </span>
            </div>
            <h2 className="text-lg font-semibold mb-2 flex gap-2 items-center">
                <User size={15}/>
                <span>{student?.name}</span>
            </h2>
            <h2 className="text-lg font-semibold mb-2 flex gap-2 items-center">
               <Phone size={15}/>
                <span>{student?.phone}</span>
            </h2>
            <h2 className="text-lg font-semibold mb-2 flex gap-2 items-center">
              <Badge icon type={`${student?.status ? 'success' : 'error'}`}>
                {student?.status ? 'Actif' : 'Inactif'}
              </Badge>
            </h2>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold mb-2 flex gap-2 items-center">
               <Gauge size={15}/>
              <span>{student?.vague.level.name}</span>
            </h2>
            <h2 className="text-lg font-semibold mb-2 flex gap-2 items-center">
               <Users size={15}/>
              <span>{student?.vague.name}</span>
              <div className="bg-red-600 text-white text-sm h-6 w-6 rounded-full flex items-center justify-center">
                {student?.vague.students.length ?? 0}
              </div>
            </h2>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              {student?.vague.modules.map((module) => {
                 return (
                    <div key={module.id} className="bg-green-200 py-1 px-3 rounded-sm mb-2 text-sm">
                       {module.name}
                    </div>
                 )
              })}

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
