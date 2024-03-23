'use client'
 
import { useFormStatus } from 'react-dom'


export function SubmitButton({children, disabled ,...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" {...props} disabled={pending || disabled}>
      {pending ? 'Loading...' : children}
    </button>
  )
}