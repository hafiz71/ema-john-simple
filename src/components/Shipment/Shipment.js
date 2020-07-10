import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    const auth = useAuth();

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

      <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Your Name" />

      {
        errors.name && <span className="error">Name is required</span>
      }
      <input email="name" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your Email" />

      {
         errors.email && <span className="error">Eamil is required</span>
      }
      <input name="addressline1" ref={register({ required: true })} placeholder="Address One" />
      {
        errors.addressline1 && <span className="error">Address is required</span>
      }
      <input name="addressline2" ref={register({ required: true })} placeholder="Address Two" />
      <input name="city" ref={register({ required: true })} placeholder="Your City" />
      {
        errors.city && <span className="error">City is required</span>
      }
      <input name="country" ref={register({ required: true })} placeholder="Your Country" />
      {
        errors.country && <span className="error">Country is required</span>
      }
      <input name="zipcode" ref={register({ required: true })} placeholder="Your Zid Code" />
      {
        errors.zipcode && <span className="error">Zid Code is required</span>
      }
      <input type="submit" />
    </form>
  );
};

export default Shipment;