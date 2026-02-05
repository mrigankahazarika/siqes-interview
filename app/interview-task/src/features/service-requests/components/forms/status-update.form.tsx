import { useForm } from "@tanstack/react-form";
import { useUpdateServiceRequest } from "../../hooks/useUpdateServiceRequests.mutation"
import { useGetServicOptions } from "../../hooks/useServiceTypes.query";

export default function ServiceStatusUpdateForm({initialData}: {initialData :string}) {


    const {mutateAsync, isPending}  = useUpdateServiceRequest();
  const { data, isFetching } : any= useGetServicOptions()

const { 
  category: serviceCats = [], 
  priority = [], 
  statues = [] 
} = data || {};


    const form = useForm({
        defaultValues: {
            status: '',
        },
        onSubmit: async (values) => {
            console.log(values, 'status update values');
            await mutateAsync({ id: initialData, payload: values.value });
        },
    });


    if (isFetching) {
            return 'loading ';
    }

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="status">
                Status

            </label>
            <form.Field 
            name="status"
            children={(field) => (
               <select
                  name={field.name}
                  className='bg-[lightgrey] text-black p-2 w-full'
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
            )}
            />
            
            <button disabled={isPending} onClick={() => form.handleSubmit()} className=" bg-[teal] text-white p-2 w-full  mt-4">
                Update Status
            </button>
        </div>
    )

}