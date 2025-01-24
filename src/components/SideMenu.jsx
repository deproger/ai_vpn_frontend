import React from 'react';
import { Link } from 'react-router-dom';
export default function SideMenu({ className }) {
  return (
    <div className={`${className} w-full bg-gray-800 text-white`}>
      <nav>
        <ul className='mt-20 flex flex-col'>
          <Link to="/tariphs" className="py-4 px-6 hover:bg-gray-700 text-xl uppercase font-thin tracking-widest">PRICE</Link>
          <Link to="/faq" className="py-4 px-6 hover:bg-gray-700 text-xl uppercase font-thin tracking-widest">FAQ</Link>
          <Link to="/" className="py-4 px-6 hover:bg-gray-700 text-xl uppercase font-thin tracking-widest">MAIN</Link>
          <Link to="/" className="py-4 px-6 hover:bg-gray-700 text-xl uppercase font-thin tracking-widest">Contact</Link>
        </ul>
      </nav>
    </div>
  );
}
