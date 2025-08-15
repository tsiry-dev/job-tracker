import AppLayout from "@/layouts/auth/AppLayout"
import type { Student } from "@/types/student"

type StudentProps = {
    student: Student
}

export default function StudentShow({ student  }: StudentProps) {

    console.log(student);


  return <AppLayout title="StudentShow">
    <div>StudentShow</div>
  </AppLayout>
}
