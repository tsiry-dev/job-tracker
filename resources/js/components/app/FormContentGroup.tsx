import { ReactNode } from "react";

type FormContentProps = {
    children: ReactNode;
}

export default function FormContentGroup({ children }: FormContentProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {children}
    </div>
  )
}
