import { Box, Button, Menu, MenuItem } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuthStore } from "../store/authStore";
import React from "react";

export default function RoleModeSwitcher() {
  const { role, setRole } = useAuthStore();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    handleClose();
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="outlined"
        size="small"
        startIcon={role === "admin" ? <SecurityIcon /> : <ShoppingCartIcon />}
        sx={{
          borderColor: role === "admin" ? "#ff6b6b" : "#4CAF50",
          color: role === "admin" ? "#ff6b6b" : "#4CAF50",
          mr: 2,
          "&:hover": {
            borderColor: role === "admin" ? "#ff6b6b" : "#4CAF50",
            backgroundColor: role === "admin" ? "rgba(255, 107, 107, 0.1)" : "rgba(76, 175, 80, 0.1)",
          },
        }}
      >
        {role === "admin" ? "Admin Mode" : "Customer Mode"}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => handleRoleChange("customer")}
          selected={role === "customer"}
        >
          <ShoppingCartIcon sx={{ mr: 1 }} /> Customer
        </MenuItem>
        <MenuItem
          onClick={() => handleRoleChange("admin")}
          selected={role === "admin"}
        >
          <SecurityIcon sx={{ mr: 1 }} /> Admin
        </MenuItem>
      </Menu>
    </Box>
  );
}
