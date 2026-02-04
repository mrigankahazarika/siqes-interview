import { useForm } from '@tanstack/react-form'
import { useGetServicOptions } from '../hooks/useServiceTypes.query';
import { useCreateServiceRequest } from '../hooks/useCreateServiceRequests.mutation';
import { ServicesTable } from './service,tabble';


// Todo: add validation here 
export default function ServiceCreateForm() {
  // i am using any to types to save time

  const {mutate, isPending, isError, error, data: mutationData} = useCreateServiceRequest()

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
    <div className="flex min-h-[80vh] items-center justify-center px-4 bg-white">
      <div className="w-full max-w-sm space-y-6">

        <form onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}>
          <form.Field
            name="title"
            children={(field) =>
              <>
                <input
                  className='bg-white text-3xl font-bold underline'
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
                <input
                  className=''
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
             <select
                  name={field.name}
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
            }
          />
          <form.Field
            name="priority"
            children={(field) =>
             <select
                  name={field.name}
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
            }
          />
          <form.Field
            name="status"
            children={(field) =>
              <>
                <select
                  name={field.name}
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
                  className="w-full"
                  disabled={!canSubmit}
                >
                  submit
                </button>
              );
            }}
          />
        </form>
      </div>
      <ServicesTable />
    </div>
  )
}