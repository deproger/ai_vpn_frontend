import React from 'react'
import Pyramid from "../components/Pyramid";
import Header from '../components/Header';
export default function Tariphs() {
  return (
    <div className=''>
      <Header/>
      {/* <h1>Welcome to Telegram Widget</h1> */}
      {/* <TelegramLoginWidget /> */}
      <Pyramid />
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold">Get premium today</h1>
        <p className="text-white opacity-70">
          Remove ads and unlock all location
        </p>
      </div>
      <div className="grid text-white px-5 mt-5">
        <div className="flex justify-between">
          <div className="w-35 px-5">
            <h2>Anonymous</h2>
            <p>Hide your ip , anonymous surfing</p>
          </div>
          <span className="w-[1px] h-full bg-white"></span>
          <div className="w-35 px-5">
            <h2>Anonymous</h2>
            <p>Hide your ip , anonymous surfing</p>
          </div>
        </div>
        <div className="flex justify-between px-5 w-full h-8 items-center">
          <span className="w-[40%] h-[1px] bg-white"></span>
          <span className="w-[40%] h-[1px] bg-white"></span>
        </div>
        <div className="flex justify-between">
          <div className="w-35 px-5">
            <h2>Anonymous</h2>
            <p>Hide your ip , anonymous surfing</p>
          </div>
          <span className="w-[1px] h-full bg-white"></span>
          <div className="w-35 px-5">
            <h2>Anonymous</h2>
            <p>Hide your ip , anonymous surfing</p>
          </div>
        </div>
      </div>
      <div className="px-5 py-5">
        <div className="flex justify-between w-full px-7 py-3 bg-white/50 backdrop-blur-lg rounded-[40px] items-center mt-2">
          <div>
            <h2 className="text-2xl font-bold text-white">1 month</h2>
            <p className="text-white opacity-70">Total price $9.99</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">9.99</h2>
            <p className="text-white opacity-70">$/Month</p>
          </div>
          <div className="">
            <input type="radio" className="w-7 h-7" />
          </div>
        </div>

        <div className="flex justify-between w-full px-7 py-3 bg-white/50 backdrop-blur-lg rounded-[40px] items-center mt-2">
          <div>
            <h2 className="text-2xl font-bold text-white">1 month</h2>
            <p className="text-white opacity-70">Total price $9.99</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">9.99</h2>
            <p className="text-white opacity-70">$/Month</p>
          </div>
          <div className="">
            <input type="radio" className="w-7 h-7" />
          </div>
        </div>

        <div className="flex justify-between w-full px-7 py-3 bg-white/50 backdrop-blur-lg rounded-[40px] items-center mt-2">
          <div>
            <h2 className="text-2xl font-bold text-white">1 month</h2>
            <p className="text-white opacity-70">Total price $9.99</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">9.99</h2>
            <p className="text-white opacity-70">$/Month</p>
          </div>
          <div className="">
            <input type="radio" className="w-7 h-7" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center flex-col items-center px-5">
        <button className="bg-black text-white font-bold w-full py-2 rounded-2xl">
          Get premium now
        </button>
        <p className="text-white opacity-70 py-5">Restore purchase</p>
      </div>
    </div>
  )
}
