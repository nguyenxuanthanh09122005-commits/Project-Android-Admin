import React from 'react'
import { AuthStore } from '../store/AuthStore'
import { Navigate } from 'react-router-dom';

export default function PublicRouter({ children }: { children: React.ReactNode }) {
    const { token } = AuthStore();
    if (token) {
        return <Navigate to={"/"} replace />
    }
    return children;
}
