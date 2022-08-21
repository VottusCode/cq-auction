import { $emitter } from "./emitter";

export class Globals {
    private customMessage: string;

    private currentItem: number | null;

    public getCustomMessage() {
        return this.customMessage;
    }

    public getCurrentItem() {
        return this.currentItem;
    }

    public setCustomMessage(customMessage: string) {
        this.customMessage = customMessage;
        $emitter.emitUpdate();
    }

    public setCurrentItem(currentItem: number | null) {
        this.currentItem = currentItem;
        $emitter.emitUpdate();
    }
}
