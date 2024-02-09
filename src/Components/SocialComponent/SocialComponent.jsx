import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';

// importing CSS, image
import "../../resources/CSS/social.css"
import "../../resources/CSS/sharedComp.css"
import dummySocialDP from "../../resources/Images/defaultDP.png"

// importing components
import DownArrowAnimation from '../SharedComponents/DownArrowAnimation';

// importing constants
import { lrDirection, socialComponentItems } from '../../Utils/Constants';
import { getMediumUserData } from '../../Utils/ApiCalls';
import { LaunchRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSocialMenu } from '../../Redux/Slicer';


const Container = styled('div')(() => ({
    display: 'flex',
    margin: '4% 0% 4% 0%',
    padding: '1% 0% 1% 0%',
    // border: '2px solid red',
    minWidth: '83vw',
    // height: '80vh',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
}));

const SocialItem = styled(Box, { shouldForwardProp: () => true })
    (() => ({
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        '&:hover':{
            transition: 'all 0.3s ease-in-out',
            boxShadow: "inset 5px 5px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: '7px 7px 7px 7px',
        }
    })
);


  
export default function SocialComponent() {

    const [socialData, setsocialData]= useState(null)
    
    // Redux setup
    const activeSocialItem= useSelector((state) => state.activeNav.activeSocialMenu)
    const dispatch= useDispatch()

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await getMediumUserData();
                setsocialData({"Medium": JSON.parse(response).data});
            } catch (error) {
                setsocialData(null);
            }
        };
        fetchData();
    }, [])


    document.addEventListener("DOMContentLoaded", function() {
        const elementToAnimate = document.querySelector(".fadeIn-riseRight");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    elementToAnimate.classList.add("visible");
                }else {
                    elementToAnimate.classList.remove("visible");
                }
            });
        });

        observer.observe(elementToAnimate);
    });


    if(!socialData)
        return(
            <Box>
                <h1> Loading Social Data... </h1>
            </Box>
        )

    return (
        <Container>
            <Box className="socialleftContainer fadeIn-riseRight">
                {/* <Typography variant="h5" sx={{display: { xs: 'none', md: 'block' }, fontFamily: 'Organetto-Stretch'}} className="VerticalWriting"> SOCIAL </Typography> */}
                <Typography variant="h7" sx={{display: { xs: 'block', md: 'none' }, opacity: 0, fontFamily: 'Organetto-Stretch'}} className="VerticalWriting"> SOCIAL </Typography>
                {/* <DownArrowAnimation direction={udDirection}/> */}
            </Box>

            <Box className="socialContainer">
                <Box className="socialtopContainer fadeIn-riseRight">
                    <Typography variant="h5" sx={{display: { xs: 'none', md: 'block' }, fontFamily: 'Organetto-Stretch'}}> SOCIAL </Typography>
                    <Typography variant="h7" sx={{display: { xs: 'block', md: 'none' }, fontFamily: 'Organetto-Stretch'}}> SOCIAL </Typography>    
                    <DownArrowAnimation direction={lrDirection}/>
                </Box>
                <Box className="SocialItemConainer">
                    {socialComponentItems.map((data, index) => (
                        <SocialItem key={index} 
                            className={`${data.color}Grad ${activeSocialItem.title === data.title ? 'activeSocialItem' : null}`} 
                            onClick={() => dispatch(setActiveSocialMenu({activeSocialMenu: {...socialData[data.title], title:data.title, color: data.color, dataComponent: data.dataComponent}}))}
                        >
                            <Box className="SocialItem fadeIn-riseUpshort">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Typography class="socialText">
                                                    {socialData[data.title] && socialData[data.title].name}
                                                </Typography>
                                            </td>
                                            <td align="right">
                                            <Typography class="socialText">
                                                    {data.title}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <Box className="centerDataZoom">
                                                    <div className="socialLogoContainer">
                                                        <img src={data.logo} alt="SocialLogo" />
                                                        <img src={data.logoText} alt="SocialLogoText" />
                                                    </div>
                                                    { data.title === "Medium" ?
                                                        <img className="socialPhoto" width="150" src={socialData[data.title].imageUrl} alt="socialProfileImage" />
                                                    :
                                                        <img className="socialPhoto" width="150" src={dummySocialDP}  alt="socialProfileDefaultImage"/>
                                                    }
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Box class="centerGroup">
                                                    <LaunchRounded fontSize='small' sx={{mr: 1}} />
                                                    <Typography variant='a' class="socialLink socialText" href={data.link}> {data.title} Profile</Typography>
                                                    {/* <Typography variant='a' class="socialText" href={data.link}> {data.title} Profile</Typography> */}
                                                </Box>
                                            </td>
                                            <td align="right">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Box>
                        </SocialItem>
                    ))}
                </Box>
                <Box className={`socialDataContainer ${activeSocialItem ? `${activeSocialItem.color}Grad` : 'hideSocialDataContainer'}`}>
                    {activeSocialItem.dataComponent}
                </Box>
            </Box>
            <Box className="socialrightContainer" >
                <Typography variant="h7" sx={{display: { xs: 'block', md: 'none' }, opacity: 0, fontFamily: 'Organetto-Stretch'}} className="VerticalWriting"> SOCIAL </Typography>
                {/* <DownArrowAnimation direction={udDirection}/> */}
            </Box>
            
        </Container>
    )
}
