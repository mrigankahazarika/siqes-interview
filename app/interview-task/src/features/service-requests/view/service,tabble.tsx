import TableCustom from "../../../components/global/table"
import { useGetServicrequests } from "../hooks/useServicesList.query"

export const ServicesTable = ()=> {

    // const query = 
    const {data, isFetching} = useGetServicrequests();

    console.log(data, isFetching, 'data, isFetching');
    
    if(!data || isFetching){
        return 'loding';
    }

    return (
        <TableCustom  tableData={data} />
    )
}