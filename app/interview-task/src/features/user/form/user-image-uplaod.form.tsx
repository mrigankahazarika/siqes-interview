import { toast } from "sonner";
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
      toast.success('Image uploaded successfully');
    },
  })

  return (
    <div className="m-5">
      <h1>User Image Upload Form</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
        className="flex flex-col m-5"
      >
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
        <button className="bg-[teal] p-5 text-white mt-4" type="submit" disabled={isPending}>
          {isPending ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}