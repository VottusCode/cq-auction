import { $axios } from ".";

export class BiddingRepository {
    public static async setCurrentItem(itemId: number | null) {
        return $axios.request({
            method: "POST",
            url: "/current-item",
            data: {
                itemId,
            },
        });
    }

    public static async setAsSold() {
        return $axios.request({
            method: "POST",
            url: "/set-sold",
        });
    }
}
