import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {

const axiosSecure = useAxiosSecure()

  const {user} = useAuth()

  const {register, handleSubmit,control,  formState: {errors}} = useForm()

  const serviceCenter = useLoaderData()
  const regionsDuplicate = serviceCenter.map(c => c.region);
  const regions = [...new Set(regionsDuplicate)]
  // explore useMemo useCallback
const districtsByRegion = (region) =>{
  const regionDistricts = serviceCenter.filter(c => c.region === region)
  const districts = regionDistricts.map(d => d.district)
  return districts
}


  const riderRegion = useWatch({control, name:'region'})
  
const handleRiderApplication = data =>{
console.log(data);

axiosSecure.post('/riders', data)
.then(res =>{
  if(res.data.insertedId){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: " Your application has been submitted. We will reach to you in 7 days",
      showConfirmButton: false,
      timer: 2000
    });
  }
})
}
  return (
    <div>
      <h2 className="text-4xl text-primary">Be a Rider</h2>
      <form onSubmit={handleSubmit(handleRiderApplication)} className='mt-12 p-4 text-black'>
     

      

      {/* two column */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        {/* Rider Details */}
        
        <fieldset className="fieldset ">
          <h4 className="text-2xl font-semibold">Rider Details</h4>

          {/* Rider name */}
          <label className="label">Rider Name</label>
          <input type="text"
          {...register('name')}
          defaultValue={user?.displayName}
          className="input w-full" placeholder="Rider Name" />

          {/* Rider email */}
          <label className="label"> Email</label>
          <input type="email"
          {...register('email')}
          className="input w-full" 
          defaultValue={user?.email}
          placeholder="Rider Email" />

{/* rider region */}
          <fieldset className="fieldset">
  <legend className="fieldset-legend"> Region</legend>
  <select {...register('region')} defaultValue="Pick a region" className="select">
    <option disabled={true}>Pick a region</option>
    {
      regions.map((r,index) =>(
        <option key={index} value={r}>{r}</option>
      ))
    }
    
    
  </select>
  
</fieldset>

        

{/*  Districts */}
          <fieldset className="fieldset">
  <legend className="fieldset-legend"> District</legend>
  <select {...register('district')} defaultValue="Pick a Districts" className="select">
    <option disabled={true}>Pick a District</option>
    {
      districtsByRegion(riderRegion).map((r,index) =>(
        <option key={index} value={r}>{r}</option>
      ))
    }
    
    
  </select>
  
</fieldset>

          
          {/* your address  */}
          <label className="label mt-4">Your Address</label>
          <input type="text"
          {...register('address')}
          className="input w-full" placeholder="Rider Address" />

          
        </fieldset>

        {/* receiver Details */}
        <fieldset className="fieldset ">
          <h4 className="text-2xl font-semibold">More Details</h4>
          <label className="label">Driving License</label>
          <input type="text"
          {...register('license')}
          className="input w-full" placeholder="Driving License" />

          {/* receiver email */}
          <label className="label">NID</label>
          <input type="number"
          {...register('nid')}
          className="input w-full" placeholder="Your NID" />

        



          {/* Receiver address  */}
          <label className="label mt-4">Bike Information</label>
          <input type="text"
          {...register('bike')}
          className="input w-full" placeholder="Bike Information" />

          

        </fieldset>
      </div>


      <input className='btn btn-primary text-black mt-4' type="submit" value="Apply as a Rider" />
      </form>
    </div>
  );
};

export default Rider;