import { useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext';
import { Button } from '../ui/button'
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

function LeftSidebar() {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess])

  return (
    <section className='leftsidebar'>
      <div className='flex flex-col gap-11'>
      <Link to='/' className='flex gap-3 items-center'>
          <img 
            src="/assets/images/portfolio-small.png" 
            // src='/assets/icons/c.png' 
            alt='logo'
            width={220}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img 
            src={user.imageUrl || '/assets/images/profile.png'}
            alt="profile"
            className='h-14 w-14 rounded-full'
          />
          <div className='flex flex-col'>
            <p className='body-blod'>
              {user.name}
            </p>
            <p className='small-regular text-light-3'>
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li 
                key={link.label}
                className={`leftsidebar-link group ${ isActive && 'bg-primary-500'}`}
              >
                <NavLink to={link.route} className='flex gap-4 items-center p-2'>
                  <img 
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${ isActive && 'invert-white'}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default LeftSidebar