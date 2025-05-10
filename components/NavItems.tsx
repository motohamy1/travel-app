import { sidebarItems } from "~/constants"
import { Link, NavLink } from "react-router"
import { cn } from "~/lib/utils"

const NavItems = ({handleClick}:{handleClick?: () => void}) => {
  const user = {
    name: 'Mahmoud Eltohamy',
    email: 'Tohamy@gmail.com',
    imageUrl: '/assets/images/david.webp'
  }
  return (
    <section className="nav-items">
        <Link to='/' className='link-logo'>
            <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
            <h1>MagicTour</h1>
        </Link>
        <div className="container">
          <nav>
            {sidebarItems.map(({ id, href, icon, label}) => (
              <NavLink 
                to={href} 
                key={id}
                className={({isActive}) => cn(
                  'link-item group nav-item',
                  {
                    'bg-primary-100 !text-white': isActive,
                    'active': isActive
                  }
                )} onClick={handleClick}>
                <div>
                  <img 
                    src={icon} 
                    alt={label} 
                    className={`group-hover:brightness-0 group-hover:invert size-[20px] ${
                      ({isActive}: {isActive: boolean}) => isActive ? 'brightness-0 invert' : 'text-dark-200'
                    }`} 
                  />
                  <span>{label}</span>
                </div>
              </NavLink>
            ))}
          </nav>
          <footer className="nav-footer">
            <img src={user?.imageUrl || '/assets/images/david.webp'} alt={user?.name || 'David'} />
            <article>
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
            </article>
            <button onClick={()=>{
              console.log('logout')
              }}
              className='cursor-pointer'
            >
              <img src="/assets/icons/logou.svg" alt="logout" className="size-6" />
            </button>
          </footer>
        </div>
    </section>
  )
}
export default NavItems
