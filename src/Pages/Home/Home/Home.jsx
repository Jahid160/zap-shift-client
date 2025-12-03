import React from 'react';
import Banner from '../Banner/Banner';
import Works from '../Works/Works';
import Services from '../Services/Services';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';


const reviewsPromise = fetch('/reviews.json').then(res => res.json())

const Home = () => {
  return (
    <div className='space-y-5'>
      <Banner></Banner>
      <Works></Works>
      <Services></Services>
      <Brands></Brands>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;