import { ReactNode } from "react"

type MainTitleProps = {
  children: ReactNode
}

export default function MainTitle({ children }: MainTitleProps) {
  return (
    <h1 className="text-2xl font-bold flex items-center gap-2 mb-3">
        {children}
    </h1>
  )
}
