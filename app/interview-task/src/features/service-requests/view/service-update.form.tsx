import { single } from '../../../services/api/services.api';
import { useForm } from '@tanstack/react-form'
import { useGetServicOptions } from '../hooks/useServiceTypes.query';
import { useUpdateServiceRequest } from '../hooks/useUpdateServiceRequests.mutation';
import { Link, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';


export default function ServiceUpdateForm() {
    const params = useParams({ strict: false })
    const serviceId = params.serviceId
    const [isLoadingService, setIsLoadingService] = useState(true)
    
    const [serviceData, setServiceData] = useState<any>(null)
  const { mutate, isPending } = useUpdateServiceRequest()
  const { data, isFetching }: any = useGetServicOptions()

  useEffect(() => {
    const fetchService = async () => {
      if (!serviceId) {
        console.error('Service ID is not available')
        setIsLoadingService(false)
        return
      }
      try {
        const response = await single(serviceId)
        setServiceData(response?.data)
        setIsLoadingService(false)
      } catch (err) {
        console.error('Error fetching service:', err)
        setIsLoadingService(false)
      }
    }
    fetchService()
  }, [serviceId])

  const {
    category: serviceCats = [],
    priority = [],
    statues = []
  } = data || {};

  const form = useForm({
    defaultValues: {
      title: serviceData?.title || '',
      description: serviceData?.description || '',
      category: serviceData?.category || '',
      priority: serviceData?.priority || '',
      status: serviceData?.status || '',
      created_by: serviceData?.created_by || 1
    },
    validators: {
      // onChange: dasschmee add here from apis,
    },
    onSubmit: async (values) => {
      mutate({
        id: serviceId,
        payload: values.value
      })
    },
    onSubmitInvalid: (data) => {
      console.log(data, 'onSubmitInvalid');
    }
  })

  useEffect(() => {
    if (serviceData) {
      form.setFieldValue('title', serviceData.title || '')
      form.setFieldValue('description', serviceData.description || '')
      form.setFieldValue('category', serviceData.category || '')
      form.setFieldValue('priority', serviceData.priority || '')
      form.setFieldValue('status', serviceData.status || '')
      form.setFieldValue('created_by', serviceData.created_by || 1)
    }
  }, [serviceData])

  if (isLoadingService && !serviceData) {
    return <div>Loading service details...</div>;
  }

  if (isFetching && !data) {
    return <div>Loading options...</div>;
  }

  return (
    <div className="w-[60vw] m-auto px-4 bg-[lightgrey] ">
      <div className='flex flex-row justify-between'>
        <h4>Update Service Request form</h4>
        <Link className='bg-[teal] text-white p-2' to="/service">go back</Link>
      </div>
      <div className=" space-y-6 flex flex-col w-full py-6">

        <form onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
          className='flex flex-col gap-2'
        >
          <form.Field
            name="title"
            children={(field) =>
              <>
                <label>Title</label>
                <input
                  className='bg-[lightgrey] text-black p-2'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder='Enter title'
                />
              </>
            }
          />
          <form.Field
            name="description"
            children={(field) =>
              <>
                <label>Description</label>
                <input
                  className='bg-[lightgrey] text-black p-2'
                  type='text'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder='Enter description'
                />
              </>
            }
          />
          <form.Field
            name="category"
            children={(field) =>
              <>
                <label>Category</label>
                <select
                  name={field.name}
                  className='bg-[lightgrey] text-black p-2'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option value={''} disabled>select category</option>
                  {
                    serviceCats?.map((item: any) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))
                  }
                </select>
              </>
            }
          />
          <form.Field
            name="priority"
            children={(field) =>
              <>
                <label htmlFor="priority-select">Priority </label>
                <select
                  name={field.name}
                  className='bg-[lightgrey] text-black p-2'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option value={''} disabled>select Priority</option>
                  {
                    priority.map((item: any) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))
                  }
                </select>
              </>
            }
          />
          <form.Field
            name="status"
            children={(field) =>
              <>
                <label>Status</label>
                <select
                  name={field.name}
                  className='bg-[lightgrey] text-black p-2'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option value={''} disabled>select status</option>
                  {
                    statues.map((item: any) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))
                  }
                </select>
              </>
            }
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([
              canSubmit,
            ]) => {
              return (
                <button
                  type="submit"
                  className="w-full bg-[teal] text-white p-3 mt-4"
                  disabled={!canSubmit || isPending}
                >
                  {isPending ? 'Updating...' : 'Update'}
                </button>
              );
            }}
          />
        </form>
      </div>
    </div>
  )
}
