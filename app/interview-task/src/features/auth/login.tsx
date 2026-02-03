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
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">

        <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
        }}>
          <form.Field
            name="email"
            children={(field) =>
              <>
                <input
                  className=''
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
                <input
                  className=''
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
    </div>
  )
}