import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import type { FormRegisterType } from '../../type/typeAuth';
import { getRegister } from '../../services/authAPI';

export default function Register() {
    // const { setLogin } = AuthStore()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false);
    console.log(loading);

    const [formRegister, setFormRegister] = useState<FormRegisterType>({
        fullname: "",
        email: "",
        password: "",
        phone: 0
    })
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value, "eeeeee");
        const { name, value } = e.target;
        console.log(name);

        setFormRegister({ ...formRegister, [name]: value })
    }
    console.log(formRegister, "formRegister");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await getRegister(formRegister);
            console.log(res, "resRegister");
            if (res.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);

        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-xl rounded-2xl">
                <div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Chào mừng trở lại
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Vui lòng đăng nhập để tiếp tục
                    </p>
                </div>

                <form className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                onChange={handleInput}
                                value={formRegister.fullname}
                                name="fullname"
                                type="text"
                                required
                                className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Nhập họ tên ..."
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                onChange={handleInput}
                                value={formRegister.email}
                                name="email"
                                type="email"
                                required
                                className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Nhập email ..."
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Mật khẩu
                            </label>
                            <input
                                value={formRegister.password}
                                onChange={handleInput}
                                name="password"
                                type="password"
                                required
                                className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input
                                value={formRegister.phone}
                                onChange={handleInput}
                                name="password"
                                type="number"
                                required
                                className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Nhập SĐT ..."
                            />
                        </div>
                    </div>


                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                    >
                        Đăng ký
                    </button>
                    <Link to={"/login"}>Đăng nhập</Link>
                </form>
            </div>
        </div>
    )
}
