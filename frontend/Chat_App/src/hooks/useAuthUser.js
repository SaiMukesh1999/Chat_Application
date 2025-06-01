// import { axiosInstance } from './axios'
// import {useQuery} from "@tanstack/react-query"

// export const useAuthUser=()=>{

//     const authUser=useQuery({
//         queryKey:["authUser"],
//         queryFn:async()=>{
//           const res= await axiosInstance.get("/auth/me");
//           return res.data
//         },
//         retry:false,
//       })


//     return {isLoading:authUser.isLoading, authData:authUser.data?.user}
// }