import { FC } from "react";
import useGetUser from "./api/hooks/useGetUser";
import axios from "axios"
import Onboarding from "./pages/onboarding";
import { Outlet, useNavigate } from "react-router-dom";

export const App: FC = () => {

    const {user, isLoading, isError, error} = useGetUser()
  
    if (isLoading) {
      return (
        <div>Loading</div>
      )
    }
  
    if (isError) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;
  
        if (statusCode === 404) {
          return <Onboarding/>
        }
      }
    }
  
    return (
      <div>
        <div>
          <Outlet context={user}/>
        </div>
      </div>
    );
  };