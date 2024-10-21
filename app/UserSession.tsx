"use client";

import React from 'react';
import { useSession } from 'next-auth/react';

import { SessionContext } from '@/context/sessionContext';
import { useUserSession } from '@/hooks/useSession';

interface UserSessionProps {
    children: React.ReactNode
}

const UserSession: React.FC<UserSessionProps> = ({
    children
}) => {
    const { data: session, status } = useSession();
    const { isAuthenticated } = useUserSession();

    return (
        <SessionContext.Provider value={{  session, status, isAuthenticated }}>
            {children}
        </SessionContext.Provider>
    );
}

export default UserSession;