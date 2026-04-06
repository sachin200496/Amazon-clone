import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";

import DashBoardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const drawerWidth = 240;
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: DashBoardIcon, path: "/admin" },
    { label: "Products", icon: InventoryIcon, path: "/admin/products" },
    { label: "Orders", icon: ShoppingCartIcon, path: "/admin/orders" },
    { label: "Users", icon: PeopleIcon, path: "/admin/users" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#f5f7fa",
          borderRight: "1px solid #e0e0e0",
          marginTop: "64px",
          height: "calc(100vh - 64px)",
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          p: 2,
          bgcolor: "#f3a847",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          ADMIN MENU
        </Typography>
      </Box>

      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                mb: 1,
                borderRadius: "8px",
                bgcolor: active ? "#e3f2fd" : "transparent",
                color: active ? "#f3a847" : "text.primary",
                borderLeft: active ? "4px solid #f3a847" : "4px solid transparent",
                pl: active ? 1.75 : 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#e3f2fd",
                  borderLeftColor: "#1976d2",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: active ? "#f3a847" : "text.secondary",
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiTypography-root": {
                    fontWeight: active ? 600 : 500,
                    fontSize: "0.95rem",
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}