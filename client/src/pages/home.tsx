import { User } from "@/api/interfaces/user.interface";
import { useOutletContext } from "react-router-dom";

const Home = () => {
    const user = useOutletContext<User>();

    return (
        <div>
            <div>Home</div>
            <div>{user.telegramId}</div>
            <div>{user.username}</div>
        </div>
    )
}

export default Home;