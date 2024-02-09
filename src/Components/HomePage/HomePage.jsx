import styled from '@emotion/styled';
import React from 'react'
import { Avatar, Box, Typography } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';

// importing CSS, image
import "../../resources/CSS/homePage.css"
import "../../resources/CSS/sharedComp.css"
import defaultDP from "../../resources/Images/defaultDP.png"

// importing components
import DownArrowAnimation from '../SharedComponents/DownArrowAnimation';

// importing constants
import { bio, lrDirection, udDirection } from '../../Utils/Constants';


const Container = styled('div')(() => ({
    display: 'flex',
    margin: '4% 0% 4% 0%',
    padding: '1% 0% 1% 0%',
    // border: '2px solid red',
    width: '100%',
    height: '80vh',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
}));

  
export default function HomePage() {
    const profession= "Sooftwaare EEngineer - Fuull SStack Deevelopper";

    return (
        <Container>
            <Box className="leftContainer fadeIn-riseRight">
                <Typography variant="h5" sx={{display: { xs: 'none', md: 'block' }, fontFamily: 'Organetto-Stretch'}} className="VerticalWriting"> Love all Serve All </Typography>
                <Typography variant="h7" sx={{display: { xs: 'block', md: 'none' }, fontFamily: 'Organetto-Stretch'}} className="VerticalWriting"> Love all Serve All </Typography>
                <DownArrowAnimation direction={udDirection}/>
            </Box>

            <Box className="introContainer">
                <Box align="left" className="fadeIn-riseRight" sx={{ display: {xs: 'block' , md: 'none'} }}>
                    <Avatar
                        className="blob-animation"
                        alt="Ashik Rai"
                        src={defaultDP}
                        sx={{ width: "40%", height: "auto" }}
                    />
                </Box>
                <div className="topContainer fadeIn-riseRight" style={{marginLeft: '1%', marginTop: {sx: '5%', md: '10%'}}}>
                    <DownArrowAnimation direction={lrDirection}/>
                </div>
                <Typography variant='h1' sx={{display: { xs: 'none', md: 'block' },fontFamily: 'Bolderist-Bold'}} className="intro fadeIn-riseRight">HI THERE !</Typography>
                <Typography variant='h4' sx={{display: { xs: 'block', md: 'none'},fontFamily: 'Bolderist-Bold'}} className="intro fadeIn-riseRight">HI THERE !</Typography>
                <Typography variant='h1' sx={{display: { xs: 'none', md: 'flex'}, fontFamily: 'Bolderist-Bold'}} className="intro fadeIn-riseRight">I'M 
                    <Typography variant='h1' className="highlight" sx={{fontFamily: 'Outline-Font'}} > ASHIK RAI</Typography>
                </Typography>
                <Typography variant='h4' sx={{display: { xs: 'flex', md: 'none'}, fontFamily: 'Bolderist-Bold'}} className="intro fadeIn-riseRight">I'M 
                    <Typography variant='h5' className="highlight" sx={{fontFamily: 'Outline-Font'}} >ASHIK RAI</Typography>
                </Typography>
                <Box className="profession fadeIn-riseUp" >
                    <Typography variant='h5' sx={{ fontFamily: 'StretchPro-Font', fontSize: '120%', display: {xs: 'none', md: 'block'} }}>{profession}</Typography>
                    <Typography variant='h5' sx={{ fontFamily: 'StretchPro-Font', fontSize: '53%', display: {xs: 'block', md: 'none'} }}>{profession}</Typography>
                </Box>
                <Typography sx={{ display: { xs: 'none', md: 'flex'} }} className='bio fadeIn-riseUp'> {bio} </Typography>
                <Typography sx={{ display: { xs: 'flex', md: 'none'}, fontSize: '70%'}} className='bio fadeIn-riseUp'> {bio} </Typography>
                <Box className="btnGroup fadeIn-riseUp">
                    <Box className="round-yellow-btn">
                        <Typography>
                            Know More About me
                        </Typography>
                    </Box>            
                    <Box className='round-icon bounce' >
                        <ArrowDownward/>
                    </Box>
                </Box>
            </Box>
            
            <Box className="rightContainer" />
            
        </Container>
    )
}
