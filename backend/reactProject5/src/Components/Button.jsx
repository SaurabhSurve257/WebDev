import React from 'react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-gray-500'

  const variants = {
    primary: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:border-gray-500',
    secondary: 'border border-gray-200 text-gray-600 bg-gray-50 hover:bg-gray-100 focus:border-gray-500',
    ghost: 'border border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button