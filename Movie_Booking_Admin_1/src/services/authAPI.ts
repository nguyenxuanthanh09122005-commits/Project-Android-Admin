// import axios from "axios"
import axios from "axios"
import type { FormloginType, FormRegisterType } from "../type/typeAuth"

const baseURL = "http://localhost:8080/api";
export const getLogin = async (form: FormloginType) => {
    const res = await axios.post(`${baseURL}/auth/login`, form)
    return res;
}
export const getRegister = async (form: FormRegisterType) => {
    const res = await axios.post(`${baseURL}/auth/register`, form)
    return res;
}