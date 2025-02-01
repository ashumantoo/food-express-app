import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="h-16 px-8">
      <div className='flex items-center justify-between'>
        <Link href={'/'}>
          <Image
            src="/logo.png"
            alt='Company Logo'
            width={70}
            height={70}
          />
        </Link>
        <nav className='mr-4 flex items-center gap-4'>
          <Link href={'/login'} className='text-lg'>LogIn</Link>
          <Link href={'/register'} className='text-lg'>Register</Link>
          <Link href={'/'} className='text-lg'>Username</Link>
        </nav>
      </div>
    </div>
  )
}

export default Header