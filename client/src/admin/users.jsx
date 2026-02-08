import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@mui/material";

const users = [
    {id:1,name:'Rahul',email:'rahul@example.com',role:'Admin'},
    {id:2,name:'Sundar',email:'sundar@example.com',role:''},
    {id:3,name:'Aaron',email:'aaron@example.com',role:'Admin'},
    {id:4,name:'Sanju',email:'sanju@example.com',role:'Admin'}
]

export default function Users(){

    return(
        <>
        <Typography variant="h5" gutterBottom>
            Users
        </Typography>   
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((u) => (
                        <TableRow key={u.id}>
                            <TableCell>{u.name}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>{u.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
        </>
    )
}