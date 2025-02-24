import { writable, type Writable } from 'svelte/store';

const activeRequests = writable(0);

class Store {
	public activeRequests = activeRequests;
}

export default new Store();
