import React from 'react';
import { useForm, useWatch,  } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const SendParcel = () => {

  const {register, handleSubmit,control,  formState: {errors}} = useForm()
  const navigate = useNavigate()

  const axiosSecure = useAxiosSecure()

  const {user} = useAuth()
  const serviceCenter = useLoaderData()
  const regionsDuplicate = serviceCenter.map(c => c.region);
  const regions = [...new Set(regionsDuplicate)]
  // explore useMemo useCallback
  const senderRegion = useWatch({control, name:'senderRegion'})
  const receiverRegion = useWatch({control,name:'receiverRegion'})

const districtsByRegion = (region) =>{
  const regionDistricts = serviceCenter.filter(c => c.region === region)
  const districts = regionDistricts.map(d => d.district)
  return districts
}

  // console.log(regions);



  const handleSendParcel = (data) =>{
  console.log(data);
  const isDocument = data.parcelType === 'document';
  
  const isSameDistrict = data.senderDistrict === data.receiverDistrict;
  const parcelWeight = parseFloat(data.parcelWeight);
// senderDistrict === data.receiverDistrict;
//   console.log(sameDistrict);

let cost = 0;
if(isDocument){
  cost = isSameDistrict? 60 : 80;
}
else{
if(parcelWeight < 3){
  cost = isSameDistrict ? 110 : 150;
}
else{
  const minCharge = isSameDistrict ? 110 : 150;
  const extraWeight = parcelWeight -3 ;
  const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40+40;

  cost = minCharge + extraCharge;
}
}
console.log('cost', cost);
data.cost = cost;
Swal.fire({
  title: "Agree with the Cost?",
  text: `You will be be charged ${cost} taka!`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "I Agree!"
}).then((result) => {
  if (result.isConfirmed) {
  
  // save the parcel info to the database
  axiosSecure.post('/parcels', data)
  .then(res => {
    console.log('after saving parcel', res.data);
    if(res.data.insertedId){
      navigate('/dashboard/my-parcels')
    Swal.fire({
  position: "top-end",
  icon: "success",
  title: " parcel has created. Please pay",
  showConfirmButton: false,
  timer: 2500
});
    }
  })

    // Swal.fire({
    //   title: "Deleted!",
    //   text: "Your file has been deleted.",
    //   icon: "success"
    // });
  }
});
  }



  return (
    <div>
      <h2 className='text-5xl font-bold'>Send a Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-4 text-black'>
      {/* parcel type */}
      <div>
        <label className="label mr-4">
          <input type="radio" name="radio-1"
          value={'document'}
          className="radio"
          {...register('parcelType')}
          defaultChecked />
          Document</label>
        <label className="label">
          <input type="radio" name="radio-1"
          value={'non-document'}
          className="radio"
          {...register('parcelType')}
          />
          Non-Document</label>
      </div>

      {/* parcel info: name, length */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
        <fieldset className="fieldset">
          <label className="label">Parcel Name</label>
          <input type="text"
          {...register('parcelName')}
          className="input w-full" placeholder="Parcel Name" />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Parcel Weight (kg)</label>
          <input type="number"
          {...register('parcelWeight')}
          className="input w-full" placeholder="Parcel Weight" />
        </fieldset>
      </div>

      {/* two column */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        {/* sender Details */}
        
        <fieldset className="fieldset ">
          <h4 className="text-2xl font-semibold">Sender Details</h4>

          {/* sender name */}
          <label className="label">Sender Name</label>
          <input type="text"
          {...register('senderName')}
          defaultValue={user?.displayName}
          className="input w-full" placeholder="Sender Name" />

          {/* sender email */}
          <label className="label">Sender Email</label>
          <input type="email"
          {...register('senderEmail')}
          className="input w-full" 
          defaultValue={user?.email}
          placeholder="Sender Email" />

{/* sender region */}
          <fieldset className="fieldset">
  <legend className="fieldset-legend">Sender Region</legend>
  <select {...register('senderRegion')} defaultValue="Pick a region" className="select">
    <option disabled={true}>Pick a region</option>
    {
      regions.map((r,index) =>(
        <option key={index} value={r}>{r}</option>
      ))
    }
    
    
  </select>
  
</fieldset>

        

{/* sender Districts */}
          <fieldset className="fieldset">
  <legend className="fieldset-legend">Sender Districts</legend>
  <select {...register('senderDistrict')} defaultValue="Pick a Districts" className="select">
    <option disabled={true}>Pick a Districts</option>
    {
      districtsByRegion(senderRegion).map((r,index) =>(
        <option key={index} value={r}>{r}</option>
      ))
    }
    
    
  </select>
  
</fieldset>

          
          {/* sender address  */}
          <label className="label mt-4">Sender Address</label>
          <input type="text"
          {...register('senderAddress')}
          className="input w-full" placeholder="Sender Address" />

          
        </fieldset>

        {/* receiver Details */}
        <fieldset className="fieldset ">
          <h4 className="text-2xl font-semibold">Receiver Details</h4>
          <label className="label">receiver Name</label>
          <input type="text"
          {...register('receiverName')}
          className="input w-full" placeholder="receiver Name" />

          {/* receiver email */}
          <label className="label">Receiver Email</label>
          <input type="email"
          {...register('receiverEmail')}
          className="input w-full" placeholder="Receiver Email" />

          {/* receiver region */}
          <fieldset className="fieldset">
  <legend className="fieldset-legend">Receiver Region</legend>
  <select {...register('receiverRegion')} defaultValue="Pick a region" className="select">
    <option disabled={true}>Pick a region</option>
    {
      regions.map((r,index) =>(
        <option key={index} value={r}>{r}</option>
      ))
    }
    
    
  </select>
  
</fieldset>

{/* receiver district */}
          <fieldset className="fieldset">
  <legend className="fieldset-legend">Receiver District</legend>
  <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select">
    <option disabled={true}>Pick a district</option>
    {
      districtsByRegion(receiverRegion).map((d,index) => (
        <option key={index} value={d}>{d}</option>
      ))
    }
    
    
  </select>
  
</fieldset>

          {/* Receiver address  */}
          <label className="label mt-4">Receiver Address</label>
          <input type="text"
          {...register('receiverAddress')}
          className="input w-full" placeholder="Receiver Address" />

          

        </fieldset>
      </div>


      <input className='btn btn-primary text-black mt-4' type="submit" value="Send Parcel" />
      </form>
    </div>
  );
};

export default SendParcel;