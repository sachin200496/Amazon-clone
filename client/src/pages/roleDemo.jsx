import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Divider,
  Alert
} from "@mui/material";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SecurityIcon from "@mui/icons-material/Security";
import HomeIcon from "@mui/icons-material/Home";

export default function RoleDemo() {
  const { user, role, logout, setRole } = useAuthStore();
  const navigate = useNavigate();

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Current Status */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
          Current Status:
        </Typography>
        <Typography variant="body2">
          User: <strong>{user?.name || "Not logged in"}</strong> | Role: <strong>{role || "None"}</strong>
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Customer Mode Demo */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: "#e8f5e9" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <ShoppingCartIcon sx={{ mr: 1, color: "#4CAF50" }} />
              <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                Customer Mode Preview
              </Typography>
            </Box>

            <Typography variant="body2" paragraph>
              View what a customer sees in this application:
            </Typography>

            <Card sx={{ mb: 2, backgroundColor: "white" }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Header Elements:
                </Typography>
                <Typography variant="caption" display="block">
                  ✓ Search bar
                </Typography>
                <Typography variant="caption" display="block">
                  ✓ Shopping cart icon with item count
                </Typography>
                <Typography variant="caption" display="block">
                  ✓ User profile menu
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2, backgroundColor: "white" }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  User Menu Options:
                </Typography>
                <Typography variant="caption" display="block">
                  • My Profile
                </Typography>
                <Typography variant="caption" display="block">
                  • Orders
                </Typography>
                <Typography variant="caption" display="block">
                  • Logout
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2, backgroundColor: "white" }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Available Routes:
                </Typography>
                <Typography variant="caption" display="block">
                  • /
                </Typography>
                <Typography variant="caption" display="block">
                  • /product/:id
                </Typography>
                <Typography variant="caption" display="block">
                  • /cart (Protected)
                </Typography>
              </CardContent>
            </Card>

            {role === "customer" ? (
              <Button 
                fullWidth 
                variant="contained" 
                color="success"
                startIcon={<HomeIcon />}
                onClick={() => navigate("/")}
              >
                Go to Home (Customer)
              </Button>
            ) : (
              <Button 
                fullWidth 
                variant="outlined" 
                color="success"
                onClick={() => handleRoleSwitch("customer")}
                disabled={!user}
              >
                Switch to Customer Mode
              </Button>
            )}
          </Paper>
        </Grid>

        {/* Admin Mode Demo */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: "#fff3e0" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <SecurityIcon sx={{ mr: 1, color: "#ff6b6b" }} />
              <Typography variant="h6" sx={{ color: "#ff6b6b", fontWeight: "bold" }}>
                Admin Mode Preview
              </Typography>
            </Box>

            <Typography variant="body2" paragraph>
              View what an admin sees in this application:
            </Typography>

            <Card sx={{ mb: 2, backgroundColor: "white" }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Header Elements:
                </Typography>
                <Typography variant="caption" display="block">
                  ✓ Admin profile menu
                </Typography>
                <Typography variant="caption" display="block">
                  ✓ Quick access to admin panel
                </Typography>
                <Typography variant="caption" display="block">
                  ✓ No shopping cart (hidden)
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2, backgroundColor: "white" }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Admin Menu Options:
                </Typography>
                <Typography variant="caption" display="block">
                  • Dashboard
                </Typography>
                <Typography variant="caption" display="block">
                  • Products
                </Typography>
                <Typography variant="caption" display="block">
                  • Orders
                </Typography>
                <Typography variant="caption" display="block">
                  • Users
                </Typography>
                <Typography variant="caption" display="block">
                  • Logout
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2, backgroundColor: "white" }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Sidebar Navigation:
                </Typography>
                <Typography variant="caption" display="block">
                  📊 Dashboard
                </Typography>
                <Typography variant="caption" display="block">
                  📦 Products
                </Typography>
                <Typography variant="caption" display="block">
                  🛒 Orders
                </Typography>
                <Typography variant="caption" display="block">
                  👥 Users
                </Typography>
              </CardContent>
            </Card>

            {role === "admin" ? (
              <Button 
                fullWidth 
                variant="contained" 
                color="error"
                startIcon={<SecurityIcon />}
                onClick={() => navigate("/admin")}
              >
                Go to Admin Panel
              </Button>
            ) : (
              <Button 
                fullWidth 
                variant="outlined" 
                color="error"
                onClick={() => handleRoleSwitch("admin")}
                disabled={!user}
              >
                Switch to Admin Mode
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Instructions */}
      <Paper sx={{ p: 3, mt: 4, backgroundColor: "#f3e5f5" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          💡 How to Test
        </Typography>

        <Typography variant="body2" paragraph>
          <strong>Step 1:</strong> Make sure you're logged in (check the alert above)
        </Typography>

        <Typography variant="body2" paragraph>
          <strong>Step 2:</strong> Use the buttons above to switch between roles
        </Typography>

        <Typography variant="body2" paragraph>
          <strong>Step 3:</strong> Notice how:
        </Typography>
        <ul>
          <li>
            <Typography variant="caption">
              The header menu changes (different menu items appear)
            </Typography>
          </li>
          <li>
            <Typography variant="caption">
              The shopping cart icon appears/disappears
            </Typography>
          </li>
          <li>
            <Typography variant="caption">
              The available routes change
            </Typography>
          </li>
        </ul>

        <Typography variant="body2" paragraph sx={{ mt: 2 }}>
          <strong>Step 4:</strong> Try accessing different routes:
        </Typography>
        <ul>
          <li>
            <Typography variant="caption">
              As customer: Try /cart and /admin
            </Typography>
          </li>
          <li>
            <Typography variant="caption">
              As admin: Try going to home page
            </Typography>
          </li>
        </ul>
      </Paper>

      {/* Current Auth State */}
      {user && (
        <Paper sx={{ p: 3, mt: 4, backgroundColor: "#eceff1" }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            📊 Current Authentication State
          </Typography>

          <Box sx={{ fontFamily: "monospace", fontSize: "12px", whiteSpace: "pre-wrap", overflow: "auto" }}>
            <Typography variant="caption" component="div" sx={{ mb: 1 }}>
              {JSON.stringify(
                {
                  user: user.name,
                  email: user.email,
                  role: role,
                  loggedIn: true,
                },
                null,
                2
              )}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Button 
            variant="contained" 
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>
      )}

      {!user && (
        <Paper sx={{ p: 3, mt: 4, backgroundColor: "#ffebee" }}>
          <Alert severity="warning">
            <Typography variant="body2">
              ⚠️ You're not logged in. Go to{" "}
              <strong style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/login")}>
                login page
              </strong>
              {" "}and select a role to test the UI.
            </Typography>
          </Alert>
        </Paper>
      )}
    </Container>
  );
}
