import axiosInstance from "../interceptors"
import { CreateUserApi } from "../interfaces/createUser.interface";

class UserService {
    BASE_URL = '/user'

    async getUserByTelegramId(telegramId: number, initDataRaw: string) {
        console.log('hello')
        return axiosInstance.get(this.BASE_URL + `/${telegramId}/${initDataRaw}`)
          .then(res => res.data)
    }

    async createUser(user: CreateUserApi, initDataRaw: string) {
        return axiosInstance.post(this.BASE_URL, {
          user,
          initDataRaw,
        })
          .then(res => res.data)
      }
}

export default new UserService();