import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'; // Для стрелок
import gradientimage from '../assets/img/Rect.png'
import Header from '../components/Header';
export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null); // Для отслеживания открытого блока

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Закрываем блок, если он был открыт, или открываем новый
  };

  const questions = [
    { question: 'Что такое React?', answer: 'React — это библиотека JavaScript для создания пользовательских интерфейсов.' },
    { question: 'Что такое JSX?', answer: 'JSX — это синтаксическое расширение для JavaScript, используемое в React.' },
    { question: 'Что такое state в React?', answer: 'State — это встроенный объект в React, который хранит информацию о компоненте.' },
  ];

  return (
    <div className="text-white h-[100vh] bg-[#1E1E1E]">
      <Header />
      <div className='flex justify-center items-center'>
        <h2 className="text-3xl font-bold mb-4 absolute w-[165px] text-center">how can 
        we help you ?</h2>
        <img src={gradientimage} alt="" className='top-0 w-full'/>
      </div>
      <div className='h-20 flex items-center px-10'>
        <h1 className='font-bold text-lg'>Recommended</h1>
      </div>
      <div className='px-5'>
      {questions.map((item, index) => (
        <div key={index} className="border-b py-4 text-white">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-lg text-white">{item.question}</h3>
            <div>
              {activeIndex === index ? (
                <FaChevronDown style={{ transition: 'transform 1s', transform: 'rotate(180deg)' }} />
              ) : (
                <FaChevronRight style={{ transition: 'transform 1s', transform: 'rotate(0deg)' }} />
              )}
            </div>
          </div>
          {activeIndex === index && (
            <div className="mt-2 text-white">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}
