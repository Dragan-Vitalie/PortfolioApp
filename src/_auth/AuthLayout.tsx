import { Outlet, Navigate } from 'react-router-dom'

function AuthLayout() {
  const isAutentificated = false;

  return (
    <>
      {isAutentificated ? (
        <Navigate to='/' />
      ):(
        <>
          <section>
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout