'use client';
import { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import React, { FC, useState } from "react";

interface SupaBaseProviderProps{
    children: React.ReactNode;
}

const SupaBaseProvider:FC<SupaBaseProviderProps> = ({children}) => {

    const [supabaseClient]= useState(()=> createClientComponentClient<Database>())

    return ( 
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
     );
}
 
export default SupaBaseProvider;