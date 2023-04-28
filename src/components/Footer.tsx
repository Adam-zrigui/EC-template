import React from 'react'
import { AiFillInstagram, AiFillTwitterSquare } from 'react-icons/ai'
export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <p>© 2023 adzrs headphones all rights reserved</p>
        <i className='icons'>
          <AiFillInstagram />
          <AiFillTwitterSquare />
        </i>
      </div>
    </footer>
  )
}
