import React from 'react'
import logo from '../assets/Screenshot_2025-06-17_at_4.19.35_PM-removebg-preview.png'

function Logo({ width = '100px' }) {
  return <img src={logo} alt="LOGO" style={{ width }} />
}

export default Logo
