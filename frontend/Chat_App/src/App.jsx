import React from 'react'
import {Routes,Route,Navigate} from "react-router"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Notifications from './pages/Notifications'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import Onboarding from './pages/Onboarding'
import {Toaster} from "react-hot-toast"
import {useQuery} from "@tanstack/react-query"
import { axiosInstance } from './lib/axios'
import { useAuthUser} from './lib/api'
import Layout from './components/Layout'
import { useThemeStore } from "./store/useThemeStore.js";
import PageLoader from "./components/PageLoader.jsx"


const App = () => {

  const {authData,isLoading}=useAuthUser()
  const { theme } = useThemeStore();

  const authUser = authData

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded
  console.log(isAuthenticated)

  if (isLoading) return <PageLoader />;

  return (
    <div className='h-screen'  data-theme={theme}> 
     
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (

          <Layout showSidebar={true}>
            <Home/>
          </Layout>
        ):(
          <Navigate to ={!isAuthenticated ? "/login" : "/onboarding"}/>

        ) }  />
        <Route path="/signup" element={!isAuthenticated ? <Signup/> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/>}/>
        <Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/>  }/>
        <Route
          path="/notification"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Notifications />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route path="/onboarding" element={isAuthenticated ? (
          !isOnboarded ? (<Onboarding/>):(
            <Navigate to="/"/>
          )

        ):(<Navigate to="/login"/>)}/>
        

      </Routes>

      <Toaster/>

    </div>
  )
}

export default App