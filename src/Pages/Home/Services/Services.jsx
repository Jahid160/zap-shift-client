import React from 'react';
import serviceImg from '../../../assets/service.png'

const Services = () => {
  const data = [
    {
      title:"Express  & Standard Delivery",
      description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
    },
    {
      title:"Nationwide Delivery",
      description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
    },
    {
      title:"Fulfillment Solution",
      description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
    },
    {
      title:"Cash on Home Delivery",
      description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
    },
    {
      title:"Corporate Service / Contract In Logistics",
      description: "Customized corporate services which includes warehouse and inventory management support."
    },
    {
      title:"Parcel Return",
      description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
    },
  ]
  return (
    <div className='bg-secondary max-w-7xl mx-auto p-5'>
      <h1 className='text-2xl text-white text-center'>Our Services</h1>
      <p className='text-white text-center'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
      
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-10 mb-10'>
          {
          data.map((item,index)=>(
            <div key={index} className={`max-w-[350px] max-h-[330px] rounded-2xl shadow-sm p-8 text-center border border-gray-100 mx-auto ${index === 1 ? 'bg-primary':'bg-white'}`}>
      {/* Icon */}
      <img
        src={serviceImg}  // ← replace with your actual image path
        alt="serviceImg"
        className="w-16 h-16 mx-auto mb-6"
      />

      {/* Title */}
      <h3 className="text-2xl font-semibold text-teal-900 mb-4">
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

export default Services;