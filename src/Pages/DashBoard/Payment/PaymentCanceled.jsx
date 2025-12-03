import React from 'react';
import { Link } from 'react-router';

const PaymentCanceled = () => {
  return (
    <div>
      <h2>Payment cancel</h2>
      <Link to={'/dashboard/my-parcels'}><button className='btn btn-primary text-black'>Try Again</button></Link>
    </div>
  );
};

export default PaymentCanceled;