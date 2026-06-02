import { api } from "./api";

export const getGenres = async () => {
    const res = await api.get("/genres");
    return res.data;
}
