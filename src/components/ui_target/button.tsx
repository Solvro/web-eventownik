import React from 'react'
import Link from 'next/link'
interface ButtonProps {

    buttonText: string;
    href: string;
  }
const Button: React.FC<ButtonProps> = ({ buttonText, href }) => {
  return (
    <Link href={href}>
      <button className="bg-secondary py-4 px-8 rounded-md font-bold">
        {buttonText}
      </button>
    </Link>
  )
}

export default Button