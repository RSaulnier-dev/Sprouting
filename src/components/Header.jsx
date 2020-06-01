import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
function Header(){

    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         flexGrow: 1,
    //     },
    //     menuButton: {
    //         marginRight: theme.spacing(2),
    //     },
    //     title: {
    //         flexGrow: 1,
    //     },
    // }));
    //
    // const classes = useStyles();
    return <header>
        <h1><span className="fas fa-seedling"/> Sprouting</h1>
        {/*<AppBar position="static">*/}
        {/*    <Toolbar>*/}
        {/*        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
        {/*            <MenuIcon />*/}
        {/*        </IconButton>*/}
        {/*        <Typography variant="h6" className={classes.title}>*/}
        {/*            <h1 className={"title"}> <span className="fas fa-seedling"/> Sprouting</h1>*/}
        {/*        </Typography>*/}
        {/*        <Button color="inherit">Login</Button>*/}
        {/*    </Toolbar>*/}
        {/*</AppBar>*/}
    </header>;
}

export default Header;