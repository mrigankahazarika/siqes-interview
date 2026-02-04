import { Sidebar } from "../components/global/sidebar"
import { Dashboard } from "../features/dashboard/view"

export const DashboardLayout = ()=> {
    return (
        <div className="flex flex-row">
            <div className="w-[10vw] bg-[teal] h-[100vh] p-5">
            <Sidebar />
            </div>
            <div className="w-full h-[100%]">
            <Dashboard />
            </div>
        </div>
    )
}