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
          paddingLeft: '3%',
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
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    background: 'black',
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
    
    const percentage= useSelector((state) => state.system.progressPercentage);

    // This useEffect section is for the Progress bar
    const handleScrollforProgressBar = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const trackLength = documentHeight - windowHeight;
        const scrollPercentage = (scrollTop / trackLength) * 100;
        if (scrollPercentage > percentage)
            dispatch(setProgressPercentage({progressPercentage: scrollPercentage }));
    };
    const setupProgressBar= ()=>{
        window.addEventListener('scroll', handleScrollforProgressBar);
    }

    
    // This is for scaling the first components on scroll
    const refElement= useRef(null)
    var scaleValue= useRef(1.0)
    var heightValue= useRef(0)
    var prevScrollY= useRef(0)

    const handleDashboardScroll = () => {
      const scrollPosition = window.scrollY;
      if(scrollPosition > prevScrollY.current){
        if (scrollPosition > 100 && scrollPosition < 1000) { 
          scaleValue.current-=  0.02
          heightValue.current+= 2.5;
        }
      }else{
        if(scrollPosition > 0){
          scaleValue.current+=  0.02
          heightValue.current-= 2.5;
        }
        else if(scrollPosition === 0){
          scaleValue.current= 1
          heightValue.current= 0;
        }
        if(scaleValue.current > 1)
          scaleValue.current= 1
      }
    //   refElement.current.style.height= `${100-heightValue.current}vh`
      refElement.current.style.transform= `scale(${scaleValue.current})`
      refElement.current.style.opacity= scaleValue.current
      prevScrollY.current= scrollPosition
    };
    const setupDashBoard= ()=>{        
  
      window.addEventListener('scroll', handleDashboardScroll);
    }

    useEffect(() => {
        dispatch(setActiveSideNav({activeSideNav: sideNavMenus[0].title}))
        setupProgressBar();
        setupDashBoard();
        return () => {
            window.removeEventListener('scroll', handleScrollforProgressBar);
            window.removeEventListener('scroll', handleDashboardScroll);
        };
    }, [])

      

    // This section handles the component render when visible
    const ViewRefs= useRef([])
    useEffect(()=>{
        const observer= new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    const index= entry.target.getAttribute('data-index')
                    TriggerBtn(index)
                    console.log(`Component ${entry.target.getAttribute('data-index')} is Visible`)
                }
            });
        },{
            threshold: 0.4
        });
        ViewRefs.current.forEach(element => {
            if(element)
                observer.observe(element)
        });
        return()=>{
            ViewRefs.current.forEach(element => {
                if(element)
                    observer.unobserve(element)
            });
        }
    },[]) 


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
        if(targetSectionBtn)
            targetSectionBtn.click();

        // const targetSection = document.getElementById("Component_"+index);
        // // Scroll to the target section
        // if (targetSection) {
            // targetSection.scrollIntoView({ behavior: 'smooth' });
        // }

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
                    <DrawerContent  sx={{background: 'transparent'}}>
                        <Box
                            className={ activePageIndex === 0 ? `fadeIn-riseUp ${open ? " centerStickyContainer " : "centerStickyContainer-expand"}` : "hide"}
                        >
                            <Box className="MainContainer">
                                <Box className={`${isSmallScreen? "SmallCodeContainerBG":"CodeContainerBG"}`} />
                                <Box className={`${isSmallScreen? "SmallCodeContainer":"CodeContainer"}`}>
                                    <TypeWriterContent content={activePageIndex} isSmallScreen={isSmallScreen}/>
                                </Box>
                            </Box>
                        </Box>
                        
                        <Box
                            className={ activePageIndex > 0 ? `fadeIn-riseUp ${open ? "stickyContainer" : "stickyContainer-expand"}`: "hide"}
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
                                <Box id="Component_0" sx={{overflow: 'hidden'}} data-index={0} ref={(elem) => {refElement.current= elem; ViewRefs.current[0]= elem}}>
                                    {isSmallScreen ? <MySmallDashBoardComponent /> : <MyDashboardComponent /> }
                                </Box>
                                <Box id="Component_1" data-index={1} ref={(elem) => ViewRefs.current[1]= elem}>
                                    { activePageIndex >= 1 ?
                                        <HomePage /> : <Box className="fullSizeContainer" />
                                    }
                                </Box>
                                <Box sx={{background: 'white'}} id="Component_2" data-index={2} ref={(elem) => ViewRefs.current[2]= elem}>
                                    { activePageIndex >= 2 ?
                                        <SocialComponent /> : <Box className="fullSizeContainer" />
                                    }
                                </Box>
                                <Box id="Component_3" data-index={3} ref={(elem) => ViewRefs.current[3]= elem}>
                                    { activePageIndex >= 3 ?
                                        <HomePage /> : <Box className="fullSizeContainer" />
                                    }
                                </Box>
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
