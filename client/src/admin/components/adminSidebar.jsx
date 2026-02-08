import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

export default function AdminSidebar(){

    return(
        <Drawer variant="permanent" 
        sx={{width:drawerWidth,[`& .muiDrawer-paper`]:{width: drawerWidth}}}>
          <Toolbar />
          <List>
            <ListItemButton component={Link} to='/admin' >
              <ListItemIcon>
                <DashBoardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>

            <ListItemButton component={Link} to='/admin/products'>
             <ListItemIcon>
                <InventoryIcon />
             </ListItemIcon>
                <ListItemText primary='Products' />
            </ListItemButton>

            <ListItemButton component={Link} to='/admin/orders'>
             <ListItemIcon>
                <ShoppingCartIcon />
             </ListItemIcon>
                <ListItemText primary='Orders' />
            </ListItemButton>

            <ListItemButton component={Link} to='/admin/users'>
             <ListItemIcon>
                <PeopleIcon />
             </ListItemIcon>
                <ListItemText primary='Users' />
            </ListItemButton>
          </List>
        </Drawer>
    )
}