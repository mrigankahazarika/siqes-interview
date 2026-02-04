import { Link } from "@tanstack/react-router";

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

]

export const Sidebar = () => {
    return (
        <>
        <div className="flex flex-col bg-[teal] p-4  w-[10vw] gap-2">
            {
                navigation.map((item,index) => (
                    <Link
                    className="bg-[white] px-5 py-2 rounded-xl"
                    to={item.link}
                    params={{ somewhereId: 'baz' }}
                    >
                    {item.name}
                </Link>
                ))
            }
        </div>
            </>
    )
}