
import {
    Grid,

    Paper,
    Typography
} from "@mui/material";


const StatCard = ({ title, value }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="subitle2">{title}</Typography>
            <Typography variant="h4">{value}</Typography>
        </Paper>
    )
}

export default function Dashboard() {

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Admin Dashboard
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <StatCard title='Total Products' value='120' />
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatCard title='Total Orders' value='450' />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title='Total Users' value='980' />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title='Revenue' value='₹8,90,000' />
                </Grid>
            </Grid>
        </>
    )
}