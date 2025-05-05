import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase(import.meta.env.VITE_PB_URL);
export const currentUser = writable(pb.authStore.record);

pb.authStore.onChange((auth) => {
    if (pb.authStore.record) {
        currentUser.set(pb.authStore.record);
    } else {
        currentUser.set(null);
    }
    console.log('Auth store changed:', auth);
})