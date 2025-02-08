'use client';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { cuisinesOptions, MEDIA_FOLDER_NAME, restaurantInitialValue, workingDaysOptions } from '@/utils/const';
import { IRestaurant, IUser } from '@/utils/types';
import { DatePicker, Input, message, Select, Spin, Image } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, boolean, array } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { DoubleRightOutlined } from '@ant-design/icons';
import { UploadMedia } from './media-upload';


const RestaurantSchema = object({
  _id: string().optional().default(""),
  name: string().required(),
  email: string().email().required(),
  mobile: string().required().min(10).max(10),
  registrationNumber: string().required(),
  restaurantImage: string().optional().default(""),
  cuisines: array().min(1).required(),
  openingHours: string().required(),
  closingHours: string().required(),
  workingDays: array().default([]),
  owner: string().required(),
  address: object({
    street: string().required(),
    city: string().required(),
    state: string().required(),
    country: string().required(),
    zipcode: string().required().min(6).max(6)
  }),
  isActive: boolean().required()
}).required();

const RestaurantProfile: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const { control, reset, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<IRestaurant>({
    defaultValues: { ...restaurantInitialValue },
    resolver: yupResolver(RestaurantSchema)
  });

  const getRestaurant = async (id: string) => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.restaurants}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const jsonResponse = await apiResponse.json();
      if (jsonResponse.success) {
        setLoading(false)
        return jsonResponse.data;
      } else {
        setLoading(false)
        alert(jsonResponse.message);
        throw new Error(jsonResponse.message);
      }
    } catch (error: any) {
      console.log("Error while fetching restaurant--->", error);
      setLoading(false)
      throw error;
    }
  }

  const onSubmit: SubmitHandler<IRestaurant> = async (data) => {
    try {
      setSubmiting(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.restaurants}/${data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const jsonResponse = await apiResponse.json();
      if (jsonResponse.success) {
        messageApi.open({
          type: 'success',
          content: jsonResponse.message
        })
        setSubmiting(false);
      } else {
        messageApi.open({
          type: 'error',
          content: jsonResponse.message
        })
        setSubmiting(false);
      }
    } catch (error: any) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: error.message
      })
      setSubmiting(false);
      throw error;
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      getRestaurant(userData.restaurantId).then((data) => {
        setRestaurantName(data.name);
        setRestaurantEmail(data.email);
        reset(data);
      }).catch((error) => {
        alert(error.message);
        console.log(error);
      });
    }
  }, []);

  return (
    <div>
      {contextHolder}
      {/* <h3 className='text-lg font-bold'>Update Your Restaurant Details</h3> */}
      {!loading ? (
        <div className='p-6 bg-white'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Image
                src={getValues('restaurantImage') ? getValues('restaurantImage') : '/profile-pic.jpg'}
                height={100}
                width={100}
                alt='User Profile Image'
                className={'rounded-full'}
              />
              <div>
                <p className='text-lg'>{restaurantName}</p>
                <p className='text-blue-500'>{restaurantEmail}</p>
              </div>
            </div>
            <button
              className='bg-red-500 text-white px-8 py-1.5 rounded-md hover:border hover:border-red-500 hover:bg-white hover:text-red-500'
              onClick={handleSubmit(onSubmit)}
              disabled={submiting}
            >
              Save
            </button>
          </div>
          <form>
            <h3 className='text-md font-bold mt-6 uppercase'>Basic Details:</h3>
            <div className='grid grid-cols-3 gap-4 mt-2'>
              <div>
                <p className='text-base font-normal'>Name*</p>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='mt-2'
                      placeholder='Enter name'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.name &&
                  <p className='text-red-500 text-md'>{errors.name.message}</p>
                }
              </div>
              <div>
                <p className='text-base font-normal'>Registration Number*</p>
                <Controller
                  name="registrationNumber"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='mt-2'
                      placeholder='Enter registration number'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.registrationNumber &&
                  <p className='text-red-500 text-md'>{errors.registrationNumber.message}</p>
                }
              </div>
              <div>
                <p className='text-base font-normal'>Eamil*</p>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='mt-2'
                      placeholder='Enter first name'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.email && <p className='text-red-500 text-md'>{errors.email.message}</p>}
              </div>
              <div>
                <p className='text-base font-normal'>Mobile*</p>
                <Controller
                  name="mobile"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='mt-2'
                      placeholder='Enter first name'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.mobile && <p className='text-red-500 text-md'>{errors.mobile.message}</p>}
              </div>
              <div>
                <p className='text-base font-normal'>Cuisines*</p>
                <Controller
                  name="cuisines"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      className='mt-2'
                      value={field.value}
                      placeholder="Please select"
                      options={cuisinesOptions}
                      size='large'
                    />
                  )}
                />
                {errors.cuisines && <p className='text-red-500 text-md'>{errors.cuisines.message}</p>}
              </div>
            </div>
            <h3 className='text-md font-bold mt-10 uppercase'>Operational Details:</h3>
            <div className='grid grid-cols-3 gap-4 mt-2 mb-4'>
              <div>
                <p className='text-base font-normal'>Opening Hours</p>
                <Controller
                  name="openingHours"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='mt-2'
                      placeholder='Eg 11:00 AM'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.openingHours && <p className='text-red-500 text-md'>{errors.openingHours.message}</p>}
              </div>
              <div>
                <p className='text-base font-normal'>Closing Hours</p>
                <Controller
                  name="closingHours"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='mt-2'
                      placeholder='Eg 10:00 PM'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.closingHours && <p className='text-red-500 text-md'>{errors.closingHours.message}</p>}
              </div>
              <div>
                <p className='text-base font-normal'>Working Days*</p>
                <Controller
                  name="workingDays"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      className='mt-2'
                      value={field.value}
                      placeholder="Please select"
                      options={workingDaysOptions}
                      size='large'
                    />
                  )}
                />
                {errors.workingDays && <p className='text-red-500 text-md'>{errors.workingDays.message}</p>}
              </div>
            </div>
            <h3 className='text-md font-bold mt-10 uppercase'>Address Details:</h3>
            <div className='grid grid-cols-3 gap-4 mt-2 mb-4'>
              <div>
                <p className='text-base font-normal'>Address Line 1</p>
                <Controller
                  name="address.street"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='mt-2'
                      placeholder='Enter street'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.address && errors.address.street && <p className='text-red-500 text-md'>{errors.address.street.message}</p>}
              </div>
              <div>
                <p className='text-base font-normal'>City</p>
                <Controller
                  name="address.city"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='mt-2'
                      placeholder='Enter city'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.address && errors.address.city && <p className='text-red-500 text-md'>{errors.address.city.message}</p>}
              </div>
              <div>
                <p className='text-base font-normal'>State</p>
                <Controller
                  name="address.state"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='mt-2'
                      placeholder='Enter state'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.address && errors.address.state && <p className='text-red-500 text-md'>{errors.address.state.message}</p>}
              </div>
              <div>
                <p className='text-base font-normal'>Country</p>
                <Controller
                  name="address.country"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='mt-2'
                      placeholder='Enter country'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.address && errors.address.country && <p className='text-red-500 text-md'>{errors.address.country.message}</p>}
              </div>
              <div>
                <p className='text-base font-normal'>Zipcode</p>
                <Controller
                  name="address.zipcode"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='mt-2'
                      placeholder='Enter zipcode'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.address && errors.address.zipcode && <p className='text-red-500 text-md'>{errors.address.zipcode.message}</p>}
              </div>
            </div>
            <div>
              <h3 className='text-md font-bold mt-6 uppercase mb-2'>Upload Restaurant Image:</h3>
              <UploadMedia
                folderName={MEDIA_FOLDER_NAME.USERS}
                getUploadedMediaUrls={(urls: string[]) => {
                  setValue('restaurantImage', urls[0]);
                  watch('restaurantImage');
                }}
              />
            </div>
          </form>
        </div>
      ) : <>
        <Spin />
      </>}
    </div>
  )
}

export default RestaurantProfile