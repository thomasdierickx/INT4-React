import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaGamepad } from 'react-icons/fa';

const NavBar = () => {
    return (<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            showLabels
            width="xs"
        >
            <BottomNavigationAction label="Home" to="/" icon={<AiFillHome />} />
            <BottomNavigationAction label="Profile" to="/profile" icon={<BsFillPersonFill />} />
            <a href="https://int-4.vercel.app/">
                <BottomNavigationAction label="Game" to="" icon={<FaGamepad />} />
            </a>
        </BottomNavigation>
    </Paper>);
}

export default NavBar;