import { STORAGE_KEYS } from "../Constants/StorageKeys";

export * from "./GetHeaderMenuItems"
export * from "./StickyBar"
export * from "./FormatDate"

export const Stringify = (value: object): string => {
    try {
        return JSON.stringify(value);
    } catch {
        return "";
    }
};

export const Storage = localStorage;

export const getToken = () => {
    const token = Storage.getItem(STORAGE_KEYS.TOKEN);
    return token;
};
