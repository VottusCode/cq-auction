import { $axios } from ".";

export class DataRepository {
    public static async setCustomMessage(customMessage: string) {
        return $axios.request({
            method: "POST",
            url: "/set-message",
            data: {
                customMessage
            }
        })
    }
}