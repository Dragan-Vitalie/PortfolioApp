import { Outlet, Navigate } from 'react-router-dom'

function AuthLayout() {
  const isAutentificated = false;

  return (
    <>
      {isAutentificated ? (
        <Navigate to='/' />
      ):(
        <>
          <section className='flex flex-1 justify-center items-center flex-col py-10'>
            <Outlet />
          </section>

          <img 
            // src='/assets/images/side-img.svg'
            src='/assets/images/side-tablet.jpg'
            alt='logo'
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
            // style={{backgroundImage: 'linear-gradient(to right, red, transparent'}} 
          />
        </>
      )}
    </>
  )
}

export default AuthLayout