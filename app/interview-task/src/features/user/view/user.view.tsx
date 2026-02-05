import { Link } from "@tanstack/react-router";
import { useAuthmeGet } from "../../auth/hooks/useAuthQuery";

export default function UserView() {

  const {data , isFetching} : any= useAuthmeGet();


  console.log(data);
  

  {isFetching && <p>Loading user data...</p>}
  return (
    <div>
      <h1>User View</h1>
      {data && 
        <div className="flex flex-col gap-4">
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>

          <div className="w-32 h-32">
          <img src={data.avatar && `${import.meta.env.VITE_API_BASE_URL_IMAGE}/storage/${data.avatar}` } alt="User Avatar" className="w-32 h-32 rounded-full object-cover" />
          </div>
        </div>
       }
      <Link to="/user/edit" className="bg-[teal] p-2">edit profile</Link>
    </div>
  );
}