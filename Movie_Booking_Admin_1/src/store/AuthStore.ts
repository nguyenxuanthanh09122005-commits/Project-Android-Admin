import { create } from 'zustand';

export type loginType = {
    token: string | null,
    email: string | null,
    role: string | null,
    setLogin: (token: string, email: string, role: string) => void,
    setLogout: () => void,
}
const tokenStored = localStorage.getItem("token");
const emailStored = localStorage.getItem("email");
const roleStored = localStorage.getItem("role");
console.log(tokenStored, emailStored);

export const AuthStore = create<loginType>((set) => ({

    token: tokenStored,
    email: emailStored,
    role: roleStored,

    setLogin: (token, email, role) => {

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);

        set({ token, email, role });
    },

    setLogout: () => {
        localStorage.clear();
        set({ token: null, email: null, role: null });
    }
}));