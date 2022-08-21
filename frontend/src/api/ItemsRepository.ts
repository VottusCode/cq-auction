import { $axios } from ".";

export interface AuctionItem {
    id: number
    donatedBy: string
    description: string
    currentPrice: number
    sold: boolean
    image: string
}

export interface CreateItemData {
    donatedBy: string;
    description: string;
    currentPrice?: number;
    sold?: boolean;
    image?: string;
}

export class ItemsRepository {
    public static async getItems(): Promise<AuctionItem[]> {
        return (
            await $axios.request({
                method: "GET",
                url: "/items",
            })
        ).data.items;
    }

    public static async getItem(itemId: number): Promise<AuctionItem|null> {
       try {
         return (
             await $axios.request({
                 method: "GET",
                 url: `/item/${itemId}`,
             })
         ).data.item;
       } catch {
            return null;
       }
    }

    public static async createItem(data: CreateItemData) {
        return $axios.request({
            method: "GET",
            url: "/items",
            data,
        });
    }

    public static async updateItem(itemId: number, data: Partial<CreateItemData>) {
        return $axios.request({
            method: "GET",
            url: `/item/${itemId}`,
            data,
        });
    }

    public static async deleteItem(itemId: number) {
        return $axios.request({
            method: "DELETE",
            url: `/item/${itemId}`,
        });
    }
}
