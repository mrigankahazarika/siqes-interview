import { Link } from "@tanstack/react-router";
import TableCustom from "../../../components/global/table"
import { useGetServicrequests } from "../hooks/useServicesList.query"
import { useState } from "react";

export const ServicesTable = ()=> {

    // const query = 
    const [pagination , setPagination] = useState<any>({
        page : 1,
        limit : 2
    })
    const {data, isFetching} = useGetServicrequests(pagination.page , pagination.limit);

    // console.log(data, isFetching, 'data, isFetching');
    // 
    if(!data || isFetching){
        return 'loding';
    }

    return (
        <div className="flex flex-col w-full">
        <Link to="/service/create" className="bg-[teal] text-white p-3 m-3 ml-auto">Add Service Request</Link>
              {/* <ServicesTable /> */}
        <TableCustom  
        
        tableData={data} 
            totalItems={data.total} 
            pageIndex={pagination.page - 1} 
            pageSize={pagination.limit} 
            onPageChange={(pageIndex) => {
                console.log(pageIndex,'pageIndex');
                
                setPagination(prev => ({
                    ...prev,
                    page: pageIndex + 1
                }))
            }}
        />
        {isFetching && <span> Updating...</span>}
        </div>
    )
}