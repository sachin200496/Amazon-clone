import { Box, Container, Paper, Typography, Grid, Card, CardContent, Chip, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function RoleBasedUIGuide() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4, fontWeight: "bold" }}>
        Role-Based UI System Guide
      </Typography>

      <Grid container spacing={3}>
        {/* Customer Mode Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ShoppingCartIcon sx={{ mr: 2, color: "#4CAF50", fontSize: 32 }} />
                <Typography variant="h5" sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                  Customer Mode
                </Typography>
                <Chip label="Default" color="success" size="small" sx={{ ml: 2 }} />
              </Box>

              <Typography variant="body2" color="textSecondary" paragraph>
                Standard user interface for shopping and browsing products
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                Header Features:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <ShoppingBagIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Shopping Cart with item count" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="User Account Menu" />
                </ListItem>
              </List>

              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                Available Routes:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="/" secondary="Home Page" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="/product/:id" secondary="Product Details" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="/cart" secondary="Shopping Cart (Protected)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="/login" secondary="Login Page" />
                </ListItem>
              </List>

              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                Account Menu Options:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="My Profile" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Orders" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Admin Mode Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", backgroundColor: "#fff3e0" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <SecurityIcon sx={{ mr: 2, color: "#ff6b6b", fontSize: 32 }} />
                <Typography variant="h5" sx={{ color: "#ff6b6b", fontWeight: "bold" }}>
                  Admin Mode
                </Typography>
                <Chip label="Protected" color="error" size="small" sx={{ ml: 2 }} />
              </Box>

              <Typography variant="body2" color="textSecondary" paragraph>
                Administrative interface for managing products, orders, and users
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                Header Features:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon fontSize="small" sx={{ color: "#ff6b6b" }} />
                  </ListItemIcon>
                  <ListItemText primary="Admin Dashboard Link" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Admin Account Menu" />
                </ListItem>
              </List>

              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                Sidebar Navigation:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <InventoryIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ShoppingBagIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PeopleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              </List>

              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
                Admin Menu Options:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Products" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Orders" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Users" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Protected Routes Section */}
      <Paper sx={{ p: 3, mt: 4, backgroundColor: "#e3f2fd" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          🔒 Protected Routes
        </Typography>
        <Typography variant="body2" paragraph>
          The following routes are protected and require authentication with specific roles:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <ShoppingCartIcon sx={{ color: "#4CAF50" }} />
            </ListItemIcon>
            <ListItemText
              primary="/cart"
              secondary="Requires: Customer role"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon sx={{ color: "#ff6b6b" }} />
            </ListItemIcon>
            <ListItemText
              primary="/admin (and all sub-routes)"
              secondary="Requires: Admin role"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Authentication Flow */}
      <Paper sx={{ p: 3, mt: 4, backgroundColor: "#f3e5f5" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          🔐 Authentication Flow
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
          <Chip label="1. Login Page" variant="outlined" />
          <Typography>→</Typography>
          <Chip label="2. Select Role" variant="outlined" />
          <Typography>→</Typography>
          <Chip label="3. Enter Credentials" variant="outlined" />
          <Typography>→</Typography>
          <Chip label="4. Access Role-Based UI" variant="outlined" />
        </Box>
      </Paper>

      {/* Features */}
      <Paper sx={{ p: 3, mt: 4, backgroundColor: "#e8f5e9" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          ✨ Key Features
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                Role-Based Store
              </Typography>
              <Typography variant="caption">
                Zustand store manages user authentication and role state
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                Protected Routes
              </Typography>
              <Typography variant="caption">
                Routes automatically redirect unauthorized users
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                Dynamic Navigation
              </Typography>
              <Typography variant="caption">
                Header and sidebar adapt based on user role
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                Role Switching
              </Typography>
              <Typography variant="caption">
                Easily switch between roles during testing
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                Secure Logout
              </Typography>
              <Typography variant="caption">
                Clears user data and redirects to home
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                Context-Aware Menus
              </Typography>
              <Typography variant="caption">
                Different menu items shown for different roles
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Implementation Notes */}
      <Paper sx={{ p: 3, mt: 4, backgroundColor: "#fff3e0" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          📋 Implementation Notes
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Store Location"
              secondary="src/store/authStore.js - Updated with role support"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Protected Routes"
              secondary="src/components/ProtectedRoute.jsx - Handles authentication and authorization"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Header Component"
              secondary="src/components/header.jsx - Shows role-specific menu items"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Login Page"
              secondary="src/pages/login.jsx - Includes role selection toggle"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Admin Sidebar"
              secondary="src/admin/components/adminSidebar.jsx - Admin navigation"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Role Switcher"
              secondary="src/components/RoleModeSwitcher.jsx - Optional tool for testing"
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}
