import React, { useEffect, useState, useRef } from 'react'

import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { PropTypes } from 'prop-types';
import { Avatar, Box, Typography, styled, useMediaQuery } from '@mui/material'
import { Progress } from 'antd';

// importing CSS
import "../../resources/CSS/drawer.css"
import "../../resources/CSS/sharedComp.css"

// importing Constants
import { LightTheme, darkColour, darkColour_Shade1,
        lightColour } from "../../Utils/ColorConstants"
import { closedrawerWidth, sideNavMenus, smalldrawerWidth } from '../../Utils/Constants'
import { conicColors, yellowLove } from '../../Utils/ColorConstants';
import SN_dp from "../../resources/Images/defaultDP.png"

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSideNav, setProgressPercentage } from '../../Redux/Slicer';

// importing components
import HomePage from '../HomePage/HomePage';
import SocialComponent from '../SocialComponent/SocialComponent';
import MyDashboardComponent from '../Dashboard/myDashboardComponent';
import TypeWriterContent from '../../Utils/TypeWriterContent';
import MySmallDashBoardComponent from '../Dashboard/mySmallDashBoardComponent';

// importing icons
import { CloseRounded, MenuRounded } from '@mui/icons-material';



const openedMixin = (theme) => ({
  width: smalldrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: closedrawerWidth,
});
const Drawer = styled(MuiDrawer, { shouldForwardProp: () => true })(
    ({ theme, open }) => ({
      // height: '100dvh',
      // flexShrink: 0,
      // whiteSpace: 'nowrap',
      // boxSizing: 'border-box',
      // border: '2px solid red',
      display: 'flex',
      zIndex: 999,
      transition: "0.3s all ease-in-out",
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
      '&:hover': {
          transition: 'all 0.3s ease-in-out',
          /* width: 15%; */
          paddingLeft: '3%',
          /* height: 100dvh; */
          boxShadow: `1px 0 60px -30px ${yellowLove}`
      }
    }),
);

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
//   height: '100dvh',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    // border: '5px solid red',
//   borderLeft: theme.palette.mode === LightTheme ? `3px solid ${grayColor}` : '3px solid red',
}));



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
    const [open, setOpen]= useState(false);
    const [activePageIndex, setActivePageIndex]= useState(0)
    // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const mousePosition = useRef(null);
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm')); // Change 'sm' to other breakpoints as needed

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
        if (mousePosition.current) {
            mousePosition.current.style.left = event.clientX + 'px';
            mousePosition.current.style.top = event.clientY + 'px';
        }
    };


    // Scroll to particular View
    // Function to handle button click and scroll to the target element
    const handleButtonClick = (sectionId, index) => {
        // Check if the target element exists
        console.log("index",index)
        const targetSection = document.getElementById(sectionId);
        dispatch(setActiveSideNav({activeSideNav: sideNavMenus[index].title}))
        // Scroll to the target section
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            setActivePageIndex(index)
        }
    };

    const TriggerBtn= (index) => {
        if (index === activePageIndex)
            return;
        setActivePageIndex(index)
        const targetSectionBtn = document.getElementById("SideMenuBtn_"+index);
        targetSectionBtn.click();

        const targetSection = document.getElementById("Component_"+index);
        // Scroll to the target section
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        dispatch(setActiveSideNav({activeSideNav: sideNavMenus[index].title}))
    }

    return (
        <Box sx={{ display: 'flex'}} align="center" onMouseMove={handleMouseMove} >
            <Box className={`${open ? "openSideNavButton" : "closeSideNavButton"} ${isSmallScreen ? "SideNavButton-sm" : "SideNavButton"}`} sx={{display: 'flex', flexDirection: 'column'}} onClick={() => setOpen(!open)}>
                <Box>
                    <Avatar
                        className="blob-animation"
                        alt="Ashik Rai"
                        src={SN_dp}
                        sx={{ width: "75%", m: 0.5, height: "auto" }}
                    />
                </Box>
                <Typography className={`${open ? 'hide' : null}`} variant={isSmallScreen ? 'p' : 'h5'} sx={{fontFamily: "Brasika-Font", mb: 3}} >A.R</Typography>
                <img
                    // width="35"
                    className={`sideNaveMenuIcon ${open ? null : 'hide'}`}
                    alt={`${sideNavMenus[activePageIndex].title}_icon`}
                    src={sideNavMenus[activePageIndex].icon}
                    style={{
                        width: isSmallScreen ? '90%' : '70%',
                        padding: isSmallScreen ? '0%' : '2.5%',
                        justifySelf: 'flex-start',
                        alignSelf: 'center'
                    }}
                />
                <Box className="VerticalWriting flexRow" sx={{m: isSmallScreen ? 1 : 0, flex: 1, alignSelf: 'center'}}>
                    {
                        open
                        ? <CloseRounded sx={{transform: 'rotate(90deg)', color: 'white', opacity: 0.7, pr: 0.5}} />
                        : <MenuRounded sx={{transform: 'rotate(90deg)', color: 'white', opacity: 0.7, pr: 0.5}} />
                    }
                    <Typography
                        className={`${open ? 'hide' : null}`}
                        sx={{fontWeight: 'bolder', color: 'white', fontFamily: 'Organetto-Stretch', textAlign: 'left'}}
                    >
                        {sideNavMenus[activePageIndex].title}
                    </Typography>
                </Box>
            </Box>
            <CssBaseline />
            <Drawer variant="permanent" open={open} sx={{display: { xs: 'none', md: 'block' }}}>
                <DrawerHeader className="fadeIn-riseUpshort" >
                    <Box align="center" sx={{position: 'relative',marginTop: "14%"}}>
                        <Avatar
                            className="blob-animation"
                            alt="Ashik Rai"
                            src={SN_dp}
                            sx={{ width: "75%", height: "auto" }}
                        />
                        {/* <Box sx={{position: 'absolute', p: 0.5, top: 0, right: 5, background: '#eee8f7', borderRadius: '7px'}} onClick={() => setOpen(!open)} >
                            <IconButton size='small'>
                                <CloseRounded fontSize='medium'/>
                            </IconButton>
                        </Box> */}
                    </Box>
                </DrawerHeader>

                <SideMenuItemContainer>
                    {
                        sideNavMenus.map((data, index) => {
                            return(
                            <SideMenuItem id={`SideMenuBtn_${index}`} className="fadeIn-riseUp" key={index} onClick={ () => handleButtonClick(`Component_${index}`, index)} >
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
                                <ItemTitle active={activeSideNav===data.title ? activeSideNav : null}>
                                    {data.title}
                                </ItemTitle>
                            </SideMenuItem>
                            )
                        })
                    }

                </SideMenuItemContainer>

            </Drawer>

            <DrawerContainer component="main">
                <Box>
                    {/* <DrawerHeader /> */}
                    <DrawerContent>
                        <Box
                            className={`
                                ${activePageIndex === 0
                                ?
                                    open ? "centerStickyContainer": "centerStickyContainer-expand"
                                :   open ? "stickyContainer" : "stickyContainer-expand"
                                }`
                            }
                            sx={{width: {sx: '80%', md: '40%'}}}
                        >
                            <Box className="MainContainer">
                                <Box className={`${isSmallScreen? "SmallCodeContainerBG":"CodeContainerBG"}`} />
                                <Box className={`${isSmallScreen? "SmallCodeContainer":"CodeContainer"}`}>
                                    <TypeWriterContent content={activePageIndex} isSmallScreen={isSmallScreen}/>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="flex-container">        
                            <Box className="flex-item-homePage">
                                <Box className="progressBarContianer">
                                    <Progress percent={percentage} strokeColor={conicColors} showInfo={false} />
                                </Box>
                                <Box id="Component_0" onMouseOver={() => TriggerBtn(0)}>
                                    {isSmallScreen ? <MySmallDashBoardComponent /> : <MyDashboardComponent /> }
                                </Box>
                                <div onMouseOver={() => TriggerBtn(1)}>
                                    <Box id="Component_1" style={{background: '#eee8f7'}} >
                                        { activePageIndex >= 1 ?
                                            <HomePage /> : <Box className="fullSizeContainer" />
                                        }
                                    </Box>
                                </div>

                                <div onMouseOver={() => TriggerBtn(2)}>
                                    <Box id="Component_2">
                                        { activePageIndex >= 2 ?
                                            <SocialComponent/> : <Box className="fullSizeContainer" />
                                        }
                                    </Box>
                                </div>

                                <div onMouseOver={() => TriggerBtn(3)}>
                                    <Box id="Component_3" style={{background: '#eee8f7'}}>
                                        { activePageIndex >= 3 ?
                                            <HomePage/> : <Box className="fullSizeContainer" />
                                        }
                                    </Box>
                                </div>
                                <div onMouseOver={() => TriggerBtn(4)}>
                                    <Box id="Component_4">
                                        { activePageIndex >= 3 ?
                                            <HomePage/> : <Box className="fullSizeContainer" />
                                        }
                                    </Box>
                                </div>
                            </Box>
                        </Box>
                    </DrawerContent>
                </Box>
            </DrawerContainer>

            
            <Box className="circle" sx={{ display: {xs : 'none', md: 'block'}}} ref={mousePosition} />
        </Box>
    );
}


MyDrawer.propTypes = {
  appName: PropTypes.string.isRequired
}

MyDrawer.defaultProps = {
  appName: "My App Name"
}
