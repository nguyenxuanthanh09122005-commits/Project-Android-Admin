import { api } from "./api";

export const getUploadUrl = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/admin/movies/upload-poster", formData);
    return res.data;
}
