import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@mui/material";

const orders = [
  { id: 1, user: "Rahul", total: 2500, status: "paid" },
  { id: 2, user: "Sundar", total: 1500, status: "Pending" },
  { id: 3, user: "Aaron", total: 3200, status: "Delivered" },
  { id: 4, user: "Sanju", total: 800, status: "Cancelled" }
];

export default function Orders() {
  return (
    <>
        <Typography variant="h5" gutterBottom>
          Orders
        </Typography>

        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orders.map((o) => (
                        <TableRow key={o.id}>
                            <TableCell>{o.id}</TableCell>
                            <TableCell>{o.user}</TableCell>
                            <TableCell>{o.total}</TableCell>
                            <TableCell>{o.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
      </>  
      
    )}