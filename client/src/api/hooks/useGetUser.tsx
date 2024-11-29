import { useQuery } from "@tanstack/react-query";
import { initData, User, useSignal } from "@telegram-apps/sdk-react";
import UserService from "../services/user.service";
import axios from "axios"
import { QueryKeys } from "./queryKeys";

const UseGetUser = () => {
    const initDataState = useSignal(initData.state);
    const initDataRaw = useSignal(initData.raw);
    
    const {data: user, isLoading, isError, error} = useQuery<User>({
      queryKey: [QueryKeys.USER],
      queryFn: (): Promise<User> => UserService.getUserByTelegramId(initDataState?.user?.id!, initDataRaw!),
      enabled: !!initDataState && !!initDataRaw,
      retry: (failureCount, error) => {
        // 404 -> stop retry, other server error (overload) -> keep trying
        if (axios.isAxiosError(error) && error.response) {
          const statusCode = error.response.status;
  
          if (statusCode === 404) {
            return false;
          }
        }
  
        return failureCount < 10;
      },
      staleTime: 120 * 1000
      }
    );
  
    return {user, isLoading, isError, error};
  };
  
  export default UseGetUser;