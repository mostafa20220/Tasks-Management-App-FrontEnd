'use client'
 
import { useFormStatus } from 'react-dom'


export function SubmitButton({children ,...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" {...props} disabled={pending}>
      {pending ? 'Loading...' : children}
    </button>
  )
}