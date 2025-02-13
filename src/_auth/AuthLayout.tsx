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
            src='/assets/images/side-img.svg'
            alt='logo'
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
            // src='/assets/images/portfolio.png'
            // alt='logo'
            // className='hidden xl:block h-1/3 w-1/2 object-cover bg-no-repeat'
          />
        </>
      )}
    </>
  )
}

export default AuthLayout