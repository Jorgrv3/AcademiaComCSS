import { Stack } from "expo-router";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import { initializeDatabase } from "@/database/initializeDatabase";

export default function Layout(){
    return(
            <SQLiteProvider databaseName='CT.db' onInit={initializeDatabase}>
                    <Slot />
            </SQLiteProvider>
    )
}