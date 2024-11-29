import { QueryKeys } from "@/api/hooks/queryKeys"
import { useQueryClient } from "@tanstack/react-query"
import { User, initData, useSignal } from "@telegram-apps/sdk-react"
import UserService from "@/api/services/user.service"
import { Button } from "@telegram-apps/telegram-ui"

const Onboarding = () => {
    const queryClient = useQueryClient()

    const initDataState = useSignal(initData.state);
    const initDataRaw = useSignal(initData.raw);

    const createNewUser = () => {
        if (initDataState?.user) {
            UserService.createUser({
                telegramId: initDataState.user.id!,
                username: initDataState.user.username!,
            }, initDataRaw!).then(user => {
                setUserInContext(user)
            })
        }
    }

    const setUserInContext = (user: User) => {
        queryClient.setQueryData([QueryKeys.USER], () => user)
    }

    return (
        <div>
            <div>Onboarding</div>
            <div>Create new acc</div>
            <Button onClick={createNewUser}>Create</Button>
        </div>
    )
}

export default Onboarding;