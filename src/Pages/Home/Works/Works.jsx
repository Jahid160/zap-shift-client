import React from 'react';
import iconImg from '../../../assets/van.png'

const Works = () => {
const data = [
  {
  title:"Booking Pick & Drop",
  description:"From personal packages to business shipments — we deliver on time, every time."
  },{
title:"Cash On Delivery",
  description:"From personal packages to business shipments — we deliver on time, every time."
  },{
title:"Delivery Hub",
  description:"From personal packages to business shipments — we deliver on time, every time."
  },{
title:"Booking SME & Corporate",
  description:"From personal packages to business shipments — we deliver on time, every time."
  }
]

  return (
   <div>
    <h1 className='text-2xl font-bold my-5'>How it Works</h1>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      {
      data.map((item,index) =>(
        <div key={index} className="max-w-[300px] max-h-[260px] rounded-xl bg-white shadow-sm p-6 border border-gray-100">
      {/* Icon */}
      <img
        src={iconImg}   // ← replace with your actual image path
        alt="Pick and drop icon"
        className="w-10 h-10 mb-4"
      />

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {item.description}
      </p>
    </div>
      ))
    }
    </div>
   </div>
  );
};

export default Works;