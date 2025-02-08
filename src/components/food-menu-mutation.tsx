'use client'
import { IMenu } from '@/models/menu';
import { message, Input } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, } from 'react';
import { Controller, useForm } from 'react-hook-form';



const FoodMenuMutation = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();
  const { id } = useParams();
  const isEditing = id !== "new";

  const { control, register, handleSubmit, setValue, watch, formState: { errors } } = useForm<IMenu>({
    defaultValues: { name: "", price: 0, category: "", isAvailable: true },
  });

  // useEffect(() => {
  //   if (isEditing) {
  //     fetch(`/api/menu/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setValue("name", data.name);
  //         setValue("price", data.price);
  //         setValue("category", data.category);
  //         setValue("isAvailable", data.isAvailable);
  //       });
  //   }
  // }, [id, isEditing, setValue]);

  const onSubmit = async (data: IMenu) => {
    // const method = isEditing ? "PUT" : "POST";
    // await fetch(isEditing ? `/api/menu/${id}` : "/api/menu", {
    //   method,
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // router.push("/menu");
  };

  


  return (
    <div className="p-6 bg-white mt-4">
      {contextHolder}
      <h1 className="text-2xl font-bold mb-4">{isEditing ? "Update" : "Create"} Menu</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-3 gap-4 mt-2'>
          <div>
            <p className='text-base font-normal'>Name</p>
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
                  placeholder='Enter first name'
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
            <p className='text-base font-normal'>Price</p>
            <Controller
              name="price"
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
                  type="number"
                />
              )}
            />
            {errors.price &&
              <p className='text-red-500 text-md'>{errors.price.message}</p>
            }
          </div>
          <div>
            <p className='text-base font-normal'>Category</p>
            <Controller
              name="price"
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
                  type="number"
                />
              )}
            />
            {errors.category &&
              <p className='text-red-500 text-md'>{errors.category.message}</p>
            }
          </div>
        </div>
      </form>
    </div>
  )
}

export default FoodMenuMutation