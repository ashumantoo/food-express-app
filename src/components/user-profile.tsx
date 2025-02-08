'use client';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { formatDate, gender, MEDIA_FOLDER_NAME, userInitialValue } from '@/utils/const';
import { IUser } from '@/utils/types';
import { DatePicker, Image, Input, message, Select, Spin } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, boolean } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { DoubleRightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { UploadMedia } from './media-upload';

const UserSchema = object({
  _id: string().optional().default(""),
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  mobile: string().required().min(10).max(10),
  gender: string().required(),
  dob: string().required(),
  profileImage: string().optional().default(""),
  role: string().required(),
  address: object({
    street: string().required(),
    city: string().required(),
    state: string().required(),
    country: string().required(),
    zipcode: string().required().min(6).max(6)
  }),
  restaurant: string().required(),
  isActive: boolean().required()
}).required();

const UserProfile: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const { control, reset, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<IUser>({
    defaultValues: { ...userInitialValue },
    resolver: yupResolver(UserSchema)
  });

  const getUser = async (id: string) => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.user}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const jsonResponse = await apiResponse.json();
      if (jsonResponse.success) {
        return jsonResponse.data;
      } else {
        alert(jsonResponse.message);
        throw new Error(jsonResponse.message);
      }
    } catch (error: any) {
      console.log("Error while fetching user--->", error);
      setLoading(false);
      throw error;
    }
  }

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      setSubmiting(true);
      if (data.dob) {
        data.dob = formatDate(data.dob);
      }
      const { _id, ...rest } = data;
      const apiResponse = await fetch(`${API_ENDPOINTS.user}/${data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
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
      getUser(userData.id).then((data) => {
        setUserFullName(`${data.firstName} ${data.lastName}`)
        setUserEmail(data.email);
        reset(data);
        setLoading(false);
      }).catch((error) => {
        alert(error.message);
        setLoading(false);
        console.log(error);
      });
    }
  }, []);

  return (
    <div>
      {contextHolder}
      {/* <h3 className='text-lg font-bold'>
        <span>Settings</span>
        <DoubleRightOutlined className='h-4 w-4 mx-2' />
        Update Your Profile
      </h3> */}
      {!loading ? (
        <div className='p-6 bg-white'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Image
                src={getValues('profileImage') ? getValues('profileImage'): '/profile-pic.jpg'}
                height={100}
                width={100}
                alt='User Profile Image'
                className={'rounded-full'}
              />
              <div className='ml-4'>
                <p className='text-lg'>{userFullName}</p>
                <p className='text-blue-500'>{userEmail}</p>
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
                <p className='text-base font-normal'>First Name*</p>
                <Controller
                  name="firstName"
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
                {errors.firstName &&
                  <p className='text-red-500 text-md'>{errors.firstName.message}</p>
                }
              </div>
              <div>
                <p className='text-base font-normal'>Last Name*</p>
                <Controller
                  name="lastName"
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
                {errors.lastName && <p className='text-red-500 text-md'>{errors.lastName.message}</p>}
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
                <p className='text-base font-normal'>Gender*</p>
                <Controller
                  name="gender"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      style={{ width: '100%' }}
                      className='mt-2'
                      value={field.value}
                      placeholder="Please select"
                      options={gender}
                      size='large'
                    />
                  )}
                />
                {errors.gender && <p className='text-red-500 text-md'>{errors.gender.message}</p>}
              </div>
              <div>
                <p className='text-base font-normal'>Date of Birth*</p>
                <Controller
                  name="dob"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      style={{ width: '100%' }}
                      className='mt-2'
                      placeholder="Please choose a date"
                      defaultValue={field.value}
                      value={dayjs(field.value, 'DD/MM/YYYY')}
                      size='large'
                      format={'DD/MM/YYYY'}
                    />
                  )}
                />
                {errors.dob && <p className='text-red-500 text-md'>{errors.dob.message}</p>}
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
              <h3 className='text-md font-bold mt-6 uppercase mb-2'>Upload Profile Image:</h3>
              <UploadMedia
                folderName={MEDIA_FOLDER_NAME.USERS}
                getUploadedMediaUrls={(urls: string[]) => {
                  setValue('profileImage', urls[0]);
                  watch('profileImage');
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

export default UserProfile;
