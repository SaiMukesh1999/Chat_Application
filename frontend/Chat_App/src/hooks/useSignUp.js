import { useMutation, useQueryClient } from "@tanstack/react-query";
import {axiosInstance} from "../lib/axios"

export const useSignUp =()=>{
    const queryClient = useQueryClient();
    
      const {mutate, isPending, error}=useMutation({
        mutationFn: async(signup)=>{
          const response = await axiosInstance.post("auth/signup",signup)
          
          return response.data;
        },
        onSuccess: (data) => {
          console.log("Signup successful:", data); // Log the response here
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error) => {
          console.error("Signup failed:", error); // Optional: log errors
        },
      })


    return {isPending, error, signupMutations:mutate}
}