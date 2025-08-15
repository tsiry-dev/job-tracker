import { CheckCircle, CircleAlert, XCircle } from "lucide-react";
import { ReactNode } from "react"

type BadgeType = 'success' | 'warning' | 'error'

type BadgeProps = {
    children: ReactNode;
    type: BadgeType;
    icon: boolean
}

export default function Badge( { children, type , icon}: BadgeProps ) {
  return (
    <span
        className={`
         inline-flex items-center px-3 py-1 rounded-full font-semibold text-sm
         ${type === 'success' && 'bg-green-100 text-green-800'}
         ${type === 'warning' && 'bg-yellow-100 text-yellow-800' }
         ${type === 'error' && 'bg-red-100 text-red-700' }
         `}>
            { icon && (
                type === 'success' ? <CheckCircle className="w-5 h-5 mr-1" /> : type === 'warning' ? <CircleAlert className="w-5 h-5 mr-1" /> : type === 'error' ? <XCircle className="w-5 h-5 mr-1" /> : null
            )
            }
        {children}
    </span>
  )
}
