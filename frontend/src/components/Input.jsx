import { forwardRef } from 'react'

const Input = forwardRef(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className='w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
    />
  )
})

export default Input