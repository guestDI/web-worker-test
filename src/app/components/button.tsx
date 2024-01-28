'use client'

type ButtonProps = {
  onClick: () => void
  title: string
}

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <button
      className="border-solid border-2 rounded p-2 transform transition duration-500 hover:scale-105 hover:bg-gray-dark shadow-xl shadow-stone-500"
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
