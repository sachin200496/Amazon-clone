import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/adminSidebar.jsx";
import AdminHeader from "./components/adminHeader.jsx";

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminHeader />
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          marginTop: "64px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}