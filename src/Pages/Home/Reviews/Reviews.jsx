import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';



const Reviews = ({reviewsPromise}) => {
  const review = use(reviewsPromise)
  console.log(review);
  return (
    <>
      <div className='mb-24'>
        <div className='text-center mb-24'>
          <h3 className='text-center text-3xl font-bold my-8'>Review</h3>
          <p className='text-3xl text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus modi saepe iusto nostrum iste velit nisi incidunt earum aperiam ipsam odio, pariatur minima adipisci unde eveniet quos, dicta itaque asperiores!</p>
        </div>
        <Swiper
        loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          modifier: 1,
          scale:0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper"
      >
        {
          review.map(review =>(
            <SwiperSlide key={review.id}>
          <ReviewCard review={review}></ReviewCard>
        </SwiperSlide>
          ))
        }
        
      </Swiper>
      </div>
    </>
  );
};

export default Reviews;