import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(135deg, ${color}20 0%, ${color}05 100%)`,
        border: `1px solid ${color}30`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 24px ${color}20`,
        },
      }}
    >
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography
            color="textSecondary"
            gutterBottom
            sx={{ fontWeight: 500, fontSize: "0.9rem" }}
          >
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold", my: 1 }}>
            {value}
          </Typography>
          {trend && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
              <TrendingUpIcon sx={{ fontSize: 16, color: "success.main" }} />
              <Typography variant="caption" sx={{ color: "success.main" }}>
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: "12px",
            bgcolor: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon sx={{ color: color, fontSize: 28 }} />
        </Box>
      </CardContent>
    </Card>
  );
};

const RecentOrdersTable = () => {
  const recentOrders = [
    { id: "#ORD001", customer: "John Doe", amount: "₹5,500", status: "Delivered", date: "2026-03-13" },
    { id: "#ORD002", customer: "Jane Smith", amount: "₹8,200", status: "Pending", date: "2026-03-12" },
    { id: "#ORD003", customer: "Mike Johnson", amount: "₹3,400", status: "Processing", date: "2026-03-12" },
    { id: "#ORD004", customer: "Sarah Williams", amount: "₹12,100", status: "Delivered", date: "2026-03-11" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success.main";
      case "Pending":
        return "warning.main";
      case "Processing":
        return "info.main";
      default:
        return "text.secondary";
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f5f7fa", borderBottom: "2px solid #e0e0e0" }}>
            <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>Order ID</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>Customer</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, color: "#1a237e" }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentOrders.map((order) => (
            <TableRow
              key={order.id}
              sx={{
                "&:hover": { bgcolor: "#f9fafb" },
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <TableCell sx={{ fontWeight: 500, color: "#1a237e" }}>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 500 }}>
                {order.amount}
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "20px",
                    bgcolor: `${getStatusColor(order.status)}15`,
                    color: getStatusColor(order.status),
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {order.status}
                </Box>
              </TableCell>
              <TableCell sx={{ color: "text.secondary", fontSize: "0.9rem" }}>{order.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function Dashboard() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1a237e", mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Welcome back! Here's what's happening with your store.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value="120"
            icon={InventoryIcon}
            color="#1976d2"
            trend="+5 this week"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value="450"
            icon={ShoppingCartIcon}
            color="#388e3c"
            trend="+12 today"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value="980"
            icon={PeopleIcon}
            color="#f57c00"
            trend="+8 new users"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue"
            value="₹8,90,000"
            icon={TrendingUpIcon}
            color="#7b1fa2"
            trend="+18% vs last month"
          />
        </Grid>
      </Grid>

      {/* Performance Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", borderRadius: "12px" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#1a237e" }}>
                Performance Metrics
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Inventory Stock
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "text.secondary" }}>
                    85%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Orders Completed
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "text.secondary" }}>
                    92%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={92}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      background: "linear-gradient(90deg, #388e3c, #66bb6a)",
                    },
                  }}
                />
              </Box>

              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Customer Satisfaction
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "text.secondary" }}>
                    78%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={78}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      background: "linear-gradient(90deg, #f57c00, #ffb74d)",
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", borderRadius: "12px" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#1a237e" }}>
                Quick Stats
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2">Avg. Order Value</Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    ₹1,978
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2">Pending Orders</Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f57c00" }}>
                    12
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2">Low Stock Products</Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                    5
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2">This Month Revenue</Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#388e3c" }}>
                    ₹25,40,000
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#1a237e" }}>
          Recent Orders
        </Typography>
        <RecentOrdersTable />
      </Box>
    </Box>
  );
}