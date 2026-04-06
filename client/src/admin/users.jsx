import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@mui/material";
import { useUserStore } from "./store/store";
import { useEffect } from "react";

export default function Users(){

    const { users, getUsers } = useUserStore();
    console.log("Users component rendered, users:", users);
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return(
        <>
        <Typography variant="h5" gutterBottom>
            Users
        </Typography>   
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight:600,fontSize:"1rem"}}>Name</TableCell>
                        <TableCell sx={{fontWeight:600,fontSize:"1rem"}}>Email</TableCell>
                        <TableCell sx={{fontWeight:600,fontSize:"1rem"}}>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((u) => (
                        <TableRow key={u.id}>
                            <TableCell>{u.name}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>{u.isAdmin ? "Admin" : "User"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
        </>
    )
}