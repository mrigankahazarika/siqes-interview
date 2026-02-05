import { Link } from "@tanstack/react-router";
import TableCustom from "../../../components/global/table"
import { useGetServicrequests } from "../hooks/useServicesList.query"
import { useDeleteServiceRequest } from "../hooks/useDeleteServiceRequests.mutation"
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Dialog from "../components/dialog/status-update.dialog";
import ServiceStatusUpdateForm from "../components/forms/status-update.form";

export const ServicesTable = () => {

    const query = useQueryClient();
    const [pagination, setPagination] = useState<any>({
        page: 1,
        limit: 2
    })
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogData , setDialogData] = useState<any>(null);
    const { data, isFetching }: any = useGetServicrequests(pagination.page, pagination.limit);
    const { mutate: deleteService, isPending: isDeleting } = useDeleteServiceRequest()

    const handleDelete = (id: string) => {

        // return;
        deleteService(id, {
            onSuccess: () => {
                console.log('delete');
                query.invalidateQueries({ queryKey: ['serviceRequests', pagination.page, pagination.limit] });
            }
        })
    }

    const onStatusUpdate = (id: string) => {
        setIsDialogOpen(true);
        setDialogData(id)

    }

    // console.log(data, isFetching, 'data, isFetching');
    // 
    if (!data || isFetching) {
        return 'loding';
    }

    return (
        <div className="flex flex-col w-full">
            <Link to="/service/create" className="bg-[teal] text-white p-3 m-3 ml-auto">Add Service Request</Link>
            {/* <ServicesTable /> */}

            {/* usually we pass props to global component , as i have only one table for this , so i am changing things here directly */}
            <TableCustom

                tableData={data}
                totalItems={data?.meta?.total || 0}
                pageIndex={pagination.page - 1}
                pageSize={pagination.limit}
                onPageChange={(pageIndex) => {
                    // console.log(pageIndex,'pageIndex');

                    setPagination(prev => ({
                        ...prev,
                        page: pageIndex + 1
                    }))
                }}
                onLimitChange={(newLimit) => {
                    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 })) // Reset to page 1
                }}
                onDelete={handleDelete}
                onStatusUpdate={onStatusUpdate}
            />
            {isFetching && <span> Updating...</span>}
            {isDeleting && <span> Deleting...</span>}
            {/* // as we are not using any component library i am using a custom dialog for this */}

            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="Service Request Details"
                maxWidth="lg"
            >
                <ServiceStatusUpdateForm initialData={dialogData} />
            </Dialog>
        </div>



    )
}