import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
  <header className="bg-slate-50 shadow-sm sticky top-0 z-40">
  <Container>
    <nav className="flex items-center justify-between py-3">
      {/* Logo */}
      <div>
        <Link to="/">
          <Logo width="70px" />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap px-1 sm:flex-wrap items-center space-x-4 text-sm font-medium text-slate-700">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.name}>
                <Link
                  to={item.slug}
                  className="px-4 py-2  hover:text-red-600 transition duration-120   sm:text-base whitespace-nowrap"
                >
                  {item.name}
                </Link>
              </li>
            )
        )}
        {authStatus && (
          <li className="  text-red-700 transition duration-120  p-0">
            <LogoutBtn />
          </li>
        )}
      </ul>
    </nav>
  </Container>
</header>

  )
}

export default Header