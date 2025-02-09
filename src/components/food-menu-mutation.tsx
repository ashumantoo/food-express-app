'use client'
import { MEDIA_FOLDER_NAME, menuCategories, MenuCategoriesEnum, menuInitialValue } from '@/utils/const';
import { IMenu } from '@/utils/types';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, GetProp, Input, message, Select, Switch, Upload, UploadFile, UploadProps, Image, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { boolean, mixed, number, object, string } from 'yup';
import { UploadMedia } from './media-upload';
import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { useParams, useRouter } from 'next/navigation';

const MenuSchema = object({
  _id: string().optional().default(''),
  name: string().required(),
  price: number().required().min(1),
  discountedPrice: number().default(0),
  category: string().oneOf([MenuCategoriesEnum.VEG, MenuCategoriesEnum.NON_VEG]).required(),
  description: string().optional().default(""),
  isAvailable: boolean().required(),
  imageUrl: string().optional().default("")
});

const FoodMenuMutation = () => {
  const router = useRouter();
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const { control, reset, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm({
    defaultValues: { ...menuInitialValue },
    resolver: yupResolver(MenuSchema)
  });

  const onSubmit: SubmitHandler<IMenu> = async (data) => {
    try {
      setSubmiting(true);
      const { _id, ...rest } = data;
      const url = id ? `${API_ENDPOINTS.restaurant_owner.menu}/${id}` : `${API_ENDPOINTS.restaurant_owner.menu}`;
      const apiResponse = await fetch(url, {
        method: id ? 'PUT' : 'POST',
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
        if (!id) {
          router.push('/restaurant-owner/menu')
        }
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


  const getMenuById = async (id: string) => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`${API_ENDPOINTS.restaurant_owner.menu}/${id}`, {
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


  useEffect(() => {
    if (id && typeof id === 'string') {
      getMenuById(id).then((data) => {
        reset(data);
        setLoading(false);
      }).catch((error) => {
        alert(error.message);
        setLoading(false);
        console.log(error);
      });
    }
  }, [id]);


  return (
    <div className="p-6 bg-white mt-4">
      {contextHolder}
      {loading ? <Spin /> : (
        <>
          <div>
            <form>
              <div className='grid grid-cols-3 gap-4 mt-2'>
                <div>
                  <p className='text-base font-normal'>Name</p>
                  <Controller
                    name='name'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className='mt-1'
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
                  <p className='text-base font-normal'>Category</p>
                  <Controller
                    name='category'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        style={{ width: '100%' }}
                        className='mt-1'
                        value={field.value}
                        placeholder="Please select category"
                        options={menuCategories}
                        size='large'
                      />
                    )}
                  />
                  {errors.category &&
                    <p className='text-red-500 text-md'>{errors.category.message}</p>
                  }
                </div>
                <div>
                  <p className='text-base font-normal'>Price(₹)</p>
                  <Controller
                    name='price'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className='mt-1'
                        placeholder='Enter price'
                        value={field.value}
                        size='large'
                        type='number'
                      />
                    )}
                  />
                  {errors.price &&
                    <p className='text-red-500 text-md'>{errors.price.message}</p>
                  }
                </div>
                <div>
                  <p className='text-base font-normal'>Discounted Price(₹)</p>
                  <Controller
                    name='discountedPrice'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className='mt-1'
                        placeholder='Enter discounted price'
                        value={field.value}
                        size='large'
                        type='number'
                      />
                    )}
                  />
                  {errors.discountedPrice &&
                    <p className='text-red-500 text-md'>{errors.discountedPrice.message}</p>
                  }
                </div>
              </div>
              <div className='mt-4'>
                <p className='text-base font-normal'>Description</p>
                <Controller
                  name='description'
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <Input.TextArea
                      {...field}
                      className='mt-1 w-full'
                      placeholder='Enter description of menu'
                      value={field.value}
                      size='large'
                    />
                  )}
                />
                {errors.description &&
                  <p className='text-red-500 text-md'>{errors.description.message}</p>
                }
              </div>
              <div className='grid gap-4 mt-2'>
                <div className='flex mt-2 grid-cols-2'>
                  <Controller
                    name='isAvailable'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        className='mt-1'
                        value={field.value}
                        checked={field.value}
                        size='default'
                      />
                    )}
                  />
                  <p className='ml-2 mt-2 text-md'>Available</p>
                </div>
                {getValues('imageUrl') && (
                  <div className='grid-cols-2'>
                    <Image
                      src={getValues('imageUrl')}
                      height={160}
                      width={160}
                    />
                  </div>
                )}
                <div className='mt-4'>
                  <UploadMedia
                    folderName={MEDIA_FOLDER_NAME.MENU}
                    getUploadedMediaUrls={(urls: string[]) => {
                      setValue('imageUrl', urls[0]);
                      watch('imageUrl');
                    }}
                  />
                </div>
              </div>
              <div className='mt-4 text-right'>
                <button
                  className='bg-red-500 text-white px-8 py-1.5 rounded-md hover:border hover:border-red-500 hover:bg-white hover:text-red-500'
                  onClick={handleSubmit(onSubmit)}
                  disabled={submiting}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default FoodMenuMutation