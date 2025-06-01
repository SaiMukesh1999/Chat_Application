import React, { useState } from "react";
import { ShipWheel as ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {axiosInstance} from "../lib/axios"
import { useSignUp } from "../hooks/useSignUp";


const Signup = () => {
  const [signup, setSignup] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // 
  
  const {isPending,error,signupMutations}=useSignUp()

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutations(signup)
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="dark"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-eow w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              CHAT
            </span>
          </div>

          {/* Error message display */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>

              </div>
          ) }

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Chat and start your language learning adventure
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text"> Full Name</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="input input-bordered w-full"
                      value={signup.fullName}
                      onChange={(e) =>
                        setSignup({ ...signup, fullName: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">email</span>
                    </label>

                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="input input-bordered w-full"
                      value={signup.email}
                      onChange={(e) =>
                        setSignup({ ...signup, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>

                    <input
                      type="password"
                      placeholder="**********"
                      className="input input-bordered w-full"
                      value={signup.password}
                      onChange={(e) =>
                        setSignup({ ...signup, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  <p className="text-xs opacity-70 mt-1">
                    password must be atleast 6 characters
                  </p>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      required
                    />
                    <span className="text-xs leading-tight">
                      I agree to the{" "}
                      <span className="text-primary hover:underline">
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary hover:underline">
                        Privacy Policy
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              <button className="btn btn-primary w-full" type="submit">
                {isPending ? (
                  <>
                  <span className="loading loading-spinner loading-xs">Loading...</span>
                  </>
                ):("Create Account")}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an Account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* image part */}
        {/* <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/i.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Pratice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Signup;
