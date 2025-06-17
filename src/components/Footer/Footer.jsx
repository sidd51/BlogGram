import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
   <section className="relative overflow-hidden py-10 bg-zinc-900 border-t border-zinc-700">
  <div className="relative z-10 mx-auto max-w-7xl px-4">
    <div className="-m-6 flex flex-wrap">
      {/* Logo + Copyright */}
      <div className="w-full p-6 md:w-1/2 lg:w-5/12">
        <div className="flex h-full flex-col justify-between">
          <div className="mb-4 inline-flex items-center">
            <Logo width="150px" />
          </div>
          <p className="text-sm text-zinc-500">
            &copy; 2025. All Rights Reserved by DevBlog.
          </p>
        </div>
      </div>

      {/* Column 1 */}
      <div className="w-full p-6 md:w-1/2 lg:w-2/12">
        <h3 className="mb-4 text-xs font-semibold uppercase text-zinc-400">Company</h3>
        <ul>
          {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((text) => (
            <li key={text} className="mb-3">
              <Link to="/" className="text-sm text-white hover:text-red-600 transition">
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 2 */}
      <div className="w-full p-6 md:w-1/2 lg:w-2/12">
        <h3 className="mb-4 text-xs font-semibold uppercase text-zinc-400">Support</h3>
        <ul>
          {["Account", "Help", "Contact Us", "Customer Support"].map((text) => (
            <li key={text} className="mb-3">
              <Link to="/" className="text-sm text-white hover:text-red-600 transition">
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3 */}
      <div className="w-full p-6 md:w-1/2 lg:w-3/12">
        <h3 className="mb-4 text-xs font-semibold uppercase text-zinc-400">Legals</h3>
        <ul>
          {["Terms & Conditions", "Privacy Policy", "Licensing"].map((text) => (
            <li key={text} className="mb-3">
              <Link to="/" className="text-sm text-white hover:text-red-600 transition">
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>

  )
}

export default Footer