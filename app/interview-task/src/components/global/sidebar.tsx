import { Link } from "@tanstack/react-router";
import { useAuthmeGet } from "../../features/auth/hooks/useAuthQuery";

type INavBar = {
    id: Number;
    name: string;
    icon: string;
    link: string;

}

const navigation: INavBar[] = [
    {
        id: 1,
        name: 'Dashboard',
        icon: '',
        link: '/dashboard'
    },
    {
        id: 2,
        name: 'Services',
        icon: '',
        link: '/service'
    },
    {
        id: 2,
        name: 'My Account',
        icon: '',
        link: '/user'
    },

]

export const Sidebar = () => {  

    const {data : userInfo, isFetching} : any = useAuthmeGet();

    // console.log(userInfo,'userInfo');/
    

    return (
        <>
        <div className="flex flex-col bg-[teal] p-4  w-[15vw] gap-2">
            {
                isFetching && <div className="text-[white]">Loading...</div>
            }

            {
                !isFetching && <div className="bg-[white] p-2 rounded-xl mb-5">
                    {
                        !userInfo?.avatar && <div className="w-16 h-16 rounded-full object-cover">
                            No Image
                        </div>
                    }
                    <img src={import.meta.env.VITE_API_BASE_URL_IMAGE + '/storage/' + userInfo?.avatar} alt="User Avatar" className="w-16 h-16 rounded-full object-cover" />
                    <h3 className="font-bold">Hello,</h3>
                    <p>{userInfo?.name}</p>
                    <p>{userInfo?.email}</p>
                </div>
            }
            {
                navigation.map((item) => (
                    <Link
                    className="bg-[white] px-5 py-2 rounded-xl"
                    to={item.link}
                    // params={{ somewhereId: 'baz' }}
                    >
                    {item.name}
                </Link>
                ))
            }
        </div>
            </>
    )
}