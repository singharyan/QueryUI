import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const modalStore = writable(browser ? JSON.parse(localStorage.getItem("modalStore") || JSON.stringify(false)) : false);
modalStore.subscribe((val) => browser && (localStorage.modalStore = JSON.stringify(val)));

export const indexModalStore = writable(browser ? JSON.parse(localStorage.getItem("indexModalStore") || JSON.stringify(false)) : false);
indexModalStore.subscribe((val) => browser && (localStorage.indexModalStore = JSON.stringify(val)));

export const sidebarStore = writable(browser ? JSON.parse(localStorage.getItem("sidebarStore") || JSON.stringify(false)) : false);
sidebarStore.subscribe((val) => browser && (localStorage.sidebarStore = JSON.stringify(val)));

export const selectedSearch = writable(browser ? JSON.parse(sessionStorage.getItem("selectedSearch") || JSON.stringify("")) : "");
selectedSearch.subscribe((val) => browser && (sessionStorage.selectedSearch = JSON.stringify(val)));

export const selected = writable("");
