import React, { useEffect, useState } from 'react'

import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { PropTypes } from 'prop-types';
import { Avatar, Box, styled } from '@mui/material'
import { Progress } from 'antd';

// importing CSS
import "../../resources/CSS/drawer.css"
import "../../resources/CSS/sharedComp.css"

// importing Constants
import { LightTheme, darkColour, darkColour_Shade1,
        lightColour } from "../../Utils/ColorConstants"
import { sideNavMenus, smalldrawerWidth } from '../../Utils/Constants'
import { conicColors, yellowLove } from '../../Utils/ColorConstants';
import SN_dp from "../../resources/Images/defaultDP.png"

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSideNav, setProgressPercentage } from '../../Redux/Slicer';

// importing components
import HomePage from '../HomePage/HomePage';
import SocialComponent from '../SocialComponent/SocialComponent';



const openedMixin = (theme) => ({
  width: smalldrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerContainer = styled(Box)(({ theme}) => ({
    backgroundColor: theme.palette.mode ===  LightTheme ? lightColour: darkColour,
//   flexGrow: 1,
//   height: '100vh',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    // border: '5px solid red',
//   borderLeft: theme.palette.mode === LightTheme ? `3px solid ${grayColor}` : '3px solid red',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: () => true })(
  ({ theme, open }) => ({
    // height: '100vh',
    // flexShrink: 0,
    // whiteSpace: 'nowrap',
    // boxSizing: 'border-box',
    display: 'flex',
    zIndex: 999,
    transition: "0.3s all ease-in-out",
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    '&:hover': {
        transition: 'all 0.3s ease-in-out',
        /* width: 15%; */
        paddingLeft: '3%',
        /* height: 100vh; */
        boxShadow: `1px 0 60px -30px ${yellowLove}`
    }
  }),
);


const DrawerContent = styled(Box, {
  shouldForwardProp: () => true })(
  ({ theme }) => ({
      textAlign: 'left',
      flexGrow: 1,
      borderRadius: '14px 14px 14px 14px',
      background: theme.palette.mode ===  LightTheme ? lightColour: darkColour_Shade1,
      color: theme.palette.mode ===  LightTheme ? darkColour: lightColour,
      overflow: 'auto',
  })
);


const SideMenuItemContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    marginTop: "14%",
    width: "100%",
    padding: "0% 7% 0% 7%",
}));


const SideMenuItem = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: "row",
    padding: "2%",
    // margin: "2%",
    width: '100%',
    '&:hover .sideNaveMenuIcon': {
        width: "24%",
        transition: "0.3s all ease-in-out",
        transform: 'rotate(14deg)',
    },  
    
    '.sideNaveMenuIcon': {
        transition: "0.3s all ease-in-out",
    },  

}));

  

const ItemTitle = styled('div', { shouldForwardProp: () => true })
    (({ theme, active }) => ({
        width: '100%',
        margin: '5%',
        padding: '5%',
        textAlign: "center",
        transition: 'all 0.1s ease-in-out',
        fontFamily: 'Trophy-Font',
        ...(active && {
            color: yellowLove,
            transition: 'all 0.1s ease-in-out',
            borderRadius: "21px 21px 21px 21px",
            fontWeight: '600',
            boxShadow: "inset 5px 5px 20px rgba(0, 0, 0, 0.1)",
        }), 
        '&:hover': {
            color: yellowLove,
            transition: 'all 0.1s ease-in-out',
            borderRadius: "21px 21px 21px 21px",
            boxShadow: "inset 5px 5px 20px rgba(0, 0, 0, 0.1)",
        },
    })
);
  

export default function MyDrawer(props) {
    
    // Sate Variables
    // const [SN_dp, setSN_dp]= useState(defaultDP);
    const open= true;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Redux Operations
    const dispatch= useDispatch();
    const activeSideNav= useSelector((state) => state.activeNav.activeSideNav)
    
    useEffect(() => {
        dispatch(setActiveSideNav({activeSideNav: sideNavMenus[0].title}))
    }, [])

    
    const percentage= useSelector((state) => state.system.progressPercentage);

    // This useEffect section is for the Progress bar
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const trackLength = documentHeight - windowHeight;
            const scrollPercentage = (scrollTop / trackLength) * 100;
            if (scrollPercentage > percentage)
                dispatch(setProgressPercentage({progressPercentage: scrollPercentage }));
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // This section is for the mouse circle
    const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };


    // Scroll to particular View
    // Function to handle button click and scroll to the target element
    const handleButtonClick = (sectionId) => {
        // Check if the target element exists
        const targetSection = document.getElementById(sectionId);
        // Scroll to the target section
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box sx={{ display: 'flex'}} align="center" onMouseMove={handleMouseMove}>
            <CssBaseline />
            <Drawer variant="permanent" open={open} sx={{display: { xs: 'none', md: 'block' }}}>
                <DrawerHeader className="fadeIn-riseUpshort" >
                    <Box align="center" style={{marginTop: "14%"}}>
                        <Avatar
                            className="blob-animation"
                            alt="Remy Sharp"
                            src={SN_dp}
                            sx={{ width: "75%", height: "auto" }}
                        />
                    </Box>
                </DrawerHeader>

                <SideMenuItemContainer>
                    {
                        sideNavMenus.map((data, index) => {
                            return(
                            <SideMenuItem className="fadeIn-riseUp" key={index} onClick={ () => handleButtonClick(`Component_${index+1}`)} >
                                {data.icon && 
                                    <img width="50"
                                        className="sideNaveMenuIcon"
                                        alt={`${data.title}_icon`}
                                        src={data.icon} 
                                        style={{
                                            background: activeSideNav===data.title ? '#F3F3F3': '#FAFAFA', 
                                            borderRadius: '100%', 
                                            padding: '2.5%'
                                        }} 
                                    />
                                }
                                <ItemTitle active={activeSideNav===data.title ? activeSideNav : null} onClick={()=> dispatch(setActiveSideNav({activeSideNav: data.title}))}>
                                    {data.title}
                                </ItemTitle>
                            </SideMenuItem>
                            )
                        })
                    }

                </SideMenuItemContainer>

            </Drawer>

            <DrawerContainer component="main" >
                <div>
                    <DrawerHeader />
                    <DrawerContent>
                        <Box className="flex-container">        
                            <Box className="flex-item-homePage">
                                <div className="progressBarContianer">
                                    <Progress percent={percentage} strokeColor={conicColors} showInfo={false} />
                                </div>
                                <div id="Component_1">
                                    <SocialComponent/>
                                </div>
                                <div id="Component_2">
                                    <HomePage/>
                                </div>
                                <div id="Component_3">
                                    <HomePage/>
                                </div>
                                <div id="Component_4">
                                    <HomePage/>
                                </div>
                                <div id="Component_5">
                                    <HomePage/>
                                </div>
                            </Box>
                        </Box>
                    </DrawerContent>
                </div>
            </DrawerContainer>

            
            <Box className="circle" sx={{ display: {xs : 'none', md: 'block'}, left: mousePosition.x, top: mousePosition.y }} />
        </Box>
    );
}


MyDrawer.propTypes = {
  appName: PropTypes.string.isRequired
}

MyDrawer.defaultProps = {
  appName: "My App Name"
}
