import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const {
    date,
    delivery_email,
    id,
    parcel_id,
    pick_up_email,
    ratings,
    review:reviewItem,
    userName,
    user_email,
    user_photoURL,
  } = review;
  return (
    <div className="my-24">
      <div className="max-w-sm p-6 rounded-xl bg-base-100 shadow-md border border-gray-200">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-3xl text-teal-300 mb-3" />

      {/* Quote Text */}
      <p className="leading-relaxed mb-4">
        {reviewItem}
      </p>

      <div className="border-t border-dashed border-gray-300 my-4"></div>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary">
          <img src={user_photoURL} alt="" />
        </div>

        <div>
          <h3 className="font-semibold ">{userName}</h3>
          <p className="text-sm ">Senior Product Designer</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ReviewCard;
