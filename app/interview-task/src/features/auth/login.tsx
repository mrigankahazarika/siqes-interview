import { useForm } from '@tanstack/react-form'
import { LoginSchema } from './schemas/login.schema'
import { useLoginMutaion } from './hooks/useLogin';

export default function LoginPage() {

  const {mutate, isPending} = useLoginMutaion()

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async (values) => {
      console.log(values, 'values check s');
      mutate(values.value)

    },
  })

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 bg-[teal]">
      <div className="w-full max-w-sm space-y-6 p-5 bg-white min-h-[30vh]">

        <form 
          className='flex flex-col gap-5'
        onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
        }}>
          <form.Field
            name="email"
            children={(field) =>
              <>
              <label htmlFor="">Enter Your Email</label>
                <input
                  className='border-[#000] rounded-lg border-[1px] w-full p-3'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder='Enter Email'
                />
              </>
            }
          />
          <form.Field
            name="password"
            children={(field) =>
              <>
              <label htmlFor="">Enter Your Password</label>
                <input
                  className='border-[#000] rounded-lg border-[1px] w-full p-3'
                  type='password'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder='Enter Password'
                />
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
                  className="w-full bg-[teal] p-5 text-white text-xl"
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