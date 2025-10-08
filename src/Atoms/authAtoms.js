import {atom} from "jotai";
import {atomWithStorage} from "jotai/utils";

export const authAtom = atomWithStorage('auth',{
    token: null,
    user: null,
    isAuthenticated: false
}, {
    getItem: (key, initialValue) => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    },
    setItem: (key, value) => {
        if (value.isAuthenticated) {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else {
            localStorage.removeItem(key);
        }
    }
},{getOnInit: true});

export const userAtom = atom((get) => get(authAtom).user);
export const isAuthenticatedAtom = atom((get) => get(authAtom).isAuthenticated);
export const rolesAtom = atom((get) => get(authAtom).user?.roles || []);
export const tokenAtom = atom((get) => get(authAtom).token);

export const expiresOnAtom = atom((get) => get(authAtom).expiresOn);
export const setAuthAtom = atom(
    null,
    (get, set, newAuth) => {
        set(authAtom, {
            ...newAuth
        });
    }
);

export const logoutAtom = atom(
    null,
    (get, set) => {
        set(authAtom, {
            token: null,
            user: null,
            isAuthenticated: false,
        });
    }
);

