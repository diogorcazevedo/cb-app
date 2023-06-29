import AsyncStorage from '@react-native-async-storage/async-storage';

import {AUTH_STORAGE} from '@storage/storageConfig';

type StorageAuthTokenProps = {
    token: string;
    refresh_token: string;
}


export async function storageAuthTokenSave(token: string) {
    await AsyncStorage.setItem(AUTH_STORAGE, token);
}


export async function storageAuthTokenGet() {
    return await AsyncStorage.getItem(AUTH_STORAGE);
}


export async function storageAuthTokenRemove() {
    await AsyncStorage.removeItem(AUTH_STORAGE);
}