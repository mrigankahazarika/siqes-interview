import { useUserEditProfileMutation } from "../hooks/mutatiion/userUserEdit.mutation";
import { useForm } from "@tanstack/react-form";

export default function USerImageUploadForm() {

  const { mutateAsync, isPending } = useUserEditProfileMutation();

  const form = useForm({
    defaultValues: {
      image: null as File | null,
    },
    onSubmit: async (values) => {
      console.log(values, 'values check s');
      const formData = new FormData();
      if (values.value.image) {
        formData.append('avatar', values.value.image);
      }
      await mutateAsync(formData)
    },
  })

  return (
    <div>
      <h1>User Image Upload Form</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
        <form.Field
          name='image'
          children={(field) =>
            <>
              <label htmlFor="image">Select Image</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  field.handleChange(file);
                }}
              />
            </>
          }
        />
        <button className="bg-[teal]" type="submit" disabled={isPending}>
          {isPending ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}