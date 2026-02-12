import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-12 bg-gray-50 border-t border-gray-200">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="-m-6 flex flex-wrap">

          {/* Logo + Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">

              <div className="mb-5 flex items-center justify-start">
                <Logo width="140px" />
              </div>

              <p className="text-sm text-gray-500 leading-relaxed">
                &copy; 2025. All Rights Reserved by{" "}
                <span className="font-semibold text-gray-700">DevBlog</span>.
              </p>
            </div>
          </div>

          {/* Column 1 */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-gray-600">
              Company
            </h3>

            <ul>
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                (text) => (
                  <li key={text} className="mb-3">
                    <Link
                      to="/"
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {text}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 2 */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-gray-600">
              Support
            </h3>

            <ul>
              {["Account", "Help", "Contact Us", "Customer Support"].map(
                (text) => (
                  <li key={text} className="mb-3">
                    <Link
                      to="/"
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {text}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-gray-600">
              Legals
            </h3>

            <ul>
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                (text) => (
                  <li key={text} className="mb-3">
                    <Link
                      to="/"
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {text}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Divider */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">
            Built with ❤️ using React + Appwrite
          </p>
        </div>
      </div>
    </section>
  )
}

export default Footer
