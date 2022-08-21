import axios from "axios";

export class DataRepository {
    public static async setCustomMessage(customMessage: string) {
        return axios.request({
            method: "POST",
            url: "/message",
            data: {
                customMessage
            }
        })
    }
}