import { useForm } from '@tanstack/react-form'
import { useGetServicOptions } from '../hooks/useServiceTypes.query';
import { useCreateServiceRequest } from '../hooks/useCreateServiceRequests.mutation';
import { Link } from '@tanstack/react-router';


// Todo: add validation here 
export default function ServiceCreateForm() {
  // i am using any to types to save time

  const {mutate, isPending, isError, error, data: mutationData, mutateAsync,} = useCreateServiceRequest()

  const { data, isFetching } : any= useGetServicOptions()

//  if(isFetching){
//     return 'Loading form'
//   }\
// if (isFetching && !data) {
//   return <div>Loading options...</div>;
// }

// check validation for this form on frontend;
  console.log(data ,isFetching, 'see whats printing');
  // return 0;
const { 
  category: serviceCats = [], 
  priority = [], 
  statues = [] 
} = data || {};


  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      priority: '',
      status: '',
      created_by : 1
    },
    validators: {
      // onChange: das,
    },
    onSubmit: async (values) => {
       mutate(values.value)

    },
    onSubmitInvalid : (data)=> {
      console.log(data,'onSubmitInvalid');
      
    }
    
  })

  // console.log(isError,error,'isError');
  
  //  if(isFetching){
//     return 'Loading form'
//   }\
if (isFetching && !data) {
  return <div>Loading options...</div>;
}

 console.log(mutationData?.response,'mutationData');
 
  return (
    <div className="w-[60vw] m-auto px-4 bg-[lightgrey] ">
      <div className='flex flex-row justify-between'>
      <h4>Add Service Request form</h4>
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
                  <option value={''} disabled selected>select category</option>
                  {
                    serviceCats?.map((item: any) => (
                      <option value={item.value}>{item.label}</option>
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
                    <option value={''} disabled selected>select Priority</option>
                  {
                    priority.map((item: any) => (
                      <option value={item.value}>{item.label}</option>
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
                <select
                  name={field.name}
                  className='bg-[lightgrey] text-black p-2'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                <option value={''} disabled selected>select status</option>
                  {
                    statues.map((item: any) => (
                      <option value={item.value}>{item.label}</option>
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
                  disabled={!canSubmit}
                >
                  submit
                </button>
              );
            }}
          />
        </form>
      </div>
    </div>
  )
}