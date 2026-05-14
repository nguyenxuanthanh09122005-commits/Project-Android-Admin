import React from 'react'
import { AuthStore } from '../store/AuthStore'
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter({ children }: { children: React.ReactNode }) {
    const { token } = AuthStore();
    console.log(token);
    if (!token) {
        return <Navigate to={"/login"} replace />
    }
    return children;
}
