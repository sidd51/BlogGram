import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <Container>
        <nav className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo width="70px" />
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">

            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className="
                        px-4 py-2 rounded-full
                        text-sm sm:text-base font-medium
                        text-slate-700
                        hover:text-red-600
                        hover:bg-red-50
                        transition-all duration-200
                      "
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}

            {/* Logout Button */}
            {authStatus && (
              <li className="ml-2">
                <div className="px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 transition duration-200">
                  <LogoutBtn />
                </div>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
