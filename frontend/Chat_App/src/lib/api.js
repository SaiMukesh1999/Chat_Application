import { axiosInstance } from './axios'
import {useQuery} from "@tanstack/react-query"

export const useAuthUser=()=>{

    const authUser=useQuery({
        queryKey:["authUser"],
        queryFn:async()=>{
          const res= await axiosInstance.get("/auth/me");
          return res.data
        },
        retry:false,
        
      })


    return {isLoading:authUser.isLoading, authData:authUser.data?.user}
}

export const completeOnboarding = async(userData)=>{
    const response= await axiosInstance.post("/auth/onboarding",userData)
    return response.data;
}


export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export async function getUserFriends(){
  const response= await axiosInstance.get("/users/friends")
  return response.data;
}

export async function getRecommendedusers(){
  const response = await axiosInstance.get("/users");
  return response.data;

}

export async function getOutgoingFriendReqs(){
  const response = await axiosInstance.get("/users/outgoing-friend-requests")
  return response.data;
}

export async function sendFriendRequest(userId){
  console.log(userId)
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}
