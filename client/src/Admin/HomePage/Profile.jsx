import React from 'react'

const Profile = () => {
  const admin = JSON.parse(localStorage.getItem('AdminDetail'))
  return (
    <>
    <main className=' w-full flex justify-center items-center '>
      <div className='w-full max-w-3xl bg-white p-5'>
        
<h1>{admin.fullName}</h1>
      </div>
    </main>
    </>
  )
}

export default Profile