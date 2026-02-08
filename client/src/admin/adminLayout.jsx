import {Box,Toolbar} from "@mui/material";

import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/adminSidebar.jsx";


export default function AdminLayout(){

    return(
        <Box sx={{display:'flex'
        }}>
            <AdminSidebar />
            <Box component='main'
            sx={{flexGrow:1,p:3}}>
                <Toolbar />
                <Outlet />

            </Box>
        </Box>
    )
}