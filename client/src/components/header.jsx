import { AppBar, Toolbar, Typography, InputBase, Badge, IconButton, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import personOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from "react-router-dom";
import React from "react";
import { useCartStore } from "../store/cartStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useAuthStore } from "../store/authStore";

export default function Header() {
    const cart = useCartStore((s) => s.cart);
    const user = useAuthStore((s) => s.user);
    


    // user icon menu 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="sticky" sx={{ bgcolor: "#131921" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: { xs: 1, sm: 2 },
                    px: { xs: 1, sm: 2 },
                }}
            >

                {/* Logo */}
                <Typography
                    component={Link}
                    to="/"
                    sx={{
                        color: "secondary.main",
                        fontWeight: "bold",
                        textDecoration: "none",
                        fontSize: { xs: 18, sm: 26 },
                        whiteSpace: "nowrap",
                        "&:hover": { color: "#f3a847" },
                    }}
                >
                    Amazon
                </Typography>

                {/* Search Bar */}
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "white",
                        borderRadius: 1,
                        overflow: "hidden",
                        height: { xs: 36, sm: 42 },
                        maxWidth: { xs: "100%", sm: 700 },
                    }}
                >
                    <InputBase
                        placeholder="Search Amazon..."
                        sx={{
                            px: { xs: 1, sm: 2 },
                            flex: 1,
                            fontSize: { xs: 14, sm: 16 },
                        }}
                    />

                    <Box
                        sx={{
                            bgcolor: "#febd69",
                            px: { xs: 1.5, sm: 2.5 },
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": { bgcolor: "#f3a847" },
                        }}
                    >
                        <SearchIcon sx={{ color: "#111", fontSize: { xs: 20, sm: 24 } }} />
                    </Box>
                </Box>

                {/* Cart */}
                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 }, marginRight:2 }}>
                    
                    <Typography sx={{ color: "white", fontSize: { xs: 12, sm: 16 },display:{xs:'none',sm:'none',md:'block'} }}>
                        {user ? `Hello, ${user.name}` : 'Hello, Guest'}
                    </Typography>
                    <IconButton
                    component={Link}
                    to="/cart"
                    sx={{
                        color: "white",
                        p: { xs: 0.5, sm: 1 },
                    }}
                >
                    <Badge badgeContent={cart.length} color="error">
                        <ShoppingCartIcon fontSize="large" />
                    </Badge>
                </IconButton>
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{ color: "white" }}
                >
                    <AccountCircleIcon fontSize="large" />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <MenuItem onClick={handleMenuClose} component={Link} to="/profile">My Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/orders">Orders</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Menu>

</Box>

            </Toolbar>
        </AppBar>

    )
}