import { ReactNode } from "react"
import Badge from "./Badge";

type ModalProps = {
    children: ReactNode;
    title: string;
    onCloseModal: () => void
}

export default function Modal({ children, title, onCloseModal }: ModalProps) {

   const handleCloseModal = () => {

   }

  return (
    <div className='fixed rounded-sm p-4 top-15 left-[50%] translate-x-[-50%]  bg-white shadow-2xl w-[90%] lg:max-w-[70rem] bg-opacity-50 z-10 '>
        <div className="flex justify-between items-center mb-2">
          <h2 className="mb-2 text-gray-700 text-lg font-bold">{title}</h2>
          <span className="cursor-pointer" onClick={() => onCloseModal()}>
            <Badge icon type="error">
                Fermer
            </Badge>
          </span>
        </div>

        <div>
           {children}
        </div>
    </div>
  )
}
