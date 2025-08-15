import { ReactNode } from "react";

type FormContentProps = {
    children: ReactNode;
    label: string;
    name: string;
}

export default function FormContent({ children, name, label }: FormContentProps) {
  return (
    <div className="my-2">
      <label htmlFor={name}>{label}</label>
      {children}
    </div>
  )
}
