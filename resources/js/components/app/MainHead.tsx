import { ReactNode } from "react";

type MainHeadProps = {
   children: ReactNode;
};

export default function MainHead({ children }: MainHeadProps) {
  return (
    <div className='flex justify-between items-center mb-2'>
       {children}
    </div>
  )
}
