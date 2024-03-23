import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Box, Typography} from '@mui/material';

// importing CSS, image
import "../../resources/CSS/socialComponent.css"
import "../../resources/CSS/sharedComp.css"
import dummySocialDP from "../../resources/Images/defaultDP.png"

// importing components
import DownArrowAnimation from '../SharedComponents/DownArrowAnimation';

// importing constants
import { lrDirection, socialComponentItems } from '../../Utils/Constants';
import { getGitHubUserData, getMediumUserData } from '../../Utils/ApiCalls';
import { LaunchRounded} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSocialMenu } from '../../Redux/Slicer';
import { getSocialComponents } from '../../Utils/helperFunctions';


const Container = styled('div')(() => ({
    display: 'flex',
    margin: '4% 0% 4% 0%',
    padding: '1% 0% 1% 0%',
    // border: '2px solid red',
    // minWidth: '83vw',
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

    function setActiveSocialProfile(data){
        if (data === null){
            dispatch(setActiveSocialMenu({activeSocialMenu: null}))
            document.body.classList.remove('open-socialProfile');
        }
        else{
            dispatch(setActiveSocialMenu({
                activeSocialMenu: {
                    ...socialData[data.title],
                    title:data.title,
                    color: data.color,
                }
            }))
            document.body.classList.add('open-socialProfile');
        }
    }

    // useEffect(()=>{
    //     const fetchData = async () => {
    //         // try {
    //         //     const response = await getMediumUserData();
    //         //     setsocialData({"Medium": JSON.parse(response).data});
    //         // } catch (error) {
    //         //     setsocialData({...socialData, "Medium": null});
    //         // }
    //         try{
    //             const response = await getGitHubUserData();
    //             setsocialData({...socialData, "GitHub": JSON.parse(response)})
    //             console.log(JSON.parse(response))
    //         }catch(error){
    //             setsocialData({...socialData, "GitHub": null});
    //         }
    //     };
    //     fetchData();
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [githubData, mediumData] = await Promise.all([
              getGitHubUserData(),
              getMediumUserData(),
            ]);

            // Extract data from responses
            const responseData = {
              "Medium": JSON.parse(mediumData).data,
              "GitHub": JSON.parse(githubData).data,
            };
            setsocialData(responseData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        setActiveSocialProfile(null)
        fetchData();
      }, []);

    if(!socialData)
        return(
            <Box className="fullSizeContainer flexColumn" sx={{justifyContent: 'center', alignContent: 'center'}} >
                <Typography variant='h1' style={{textAlign: 'center'}}> Loading Social Data... </Typography>
            </Box>
        )
    return (
        <Box sx={{width: '100%', height: '100dvh', display: 'flex', justifyContent: 'center'}}>
            <Container>
                <Box className="socialleftContainer fadeIn-riseRight">
                    {/* <Typography variant="h5" sx={{display: { xs: 'none', md: 'block' }, fontFamily: 'Organetto-Stretch'}} className="VerticalWriting"> SOCIAL </Typography> */}
                    <Typography variant="h7" sx={{display: { xs: 'block', md: 'none' }, opacity: 0, fontFamily: 'Organetto-Stretch'}} className="VerticalWriting"> SOCIAL</Typography>
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
                                className={`${data.color}Grad ${activeSocialItem && activeSocialItem.title === data.title ? 'activeSocialItem' : null}`} 
                                onClick={() => setActiveSocialProfile(data)}
                            >
                                <Box className="SocialItem fadeIn-riseUpshort">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Typography className="socialText">
                                                        {socialData[data.title] && socialData[data.title].name}
                                                    </Typography>
                                                </td>
                                                <td align="right">
                                                <Typography className="socialText">
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
                                                        { socialData[data.title] ?
                                                            <img className="socialPhoto" width="150" src={socialData[data.title].imageUrl} alt="socialProfileImage" />
                                                        :
                                                            <img className="socialPhoto" width="150" src={dummySocialDP}  alt="socialProfileDefaultImage"/>
                                                        }
                                                    </Box>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Box className="centerGroup">
                                                        <LaunchRounded fontSize='small' sx={{mr: 1}} />
                                                        <Typography variant='a' className="socialLink socialText" href={data.link}> {data.title} Profile</Typography>
                                                        {/* <Typography variant='a' className="socialText" href={data.link}> {data.title} Profile</Typography> */}
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
                    {activeSocialItem &&
                        <Box className={`${activeSocialItem && activeSocialItem ? `GradContainer onFaceContainer` : null}`}>
                            <Box className="socialDataContainer">
                                {/* <MenuRounded onClick={()=> setActiveSocialProfile(null)} /> */}
                                {activeSocialItem && getSocialComponents(activeSocialItem.title, setActiveSocialProfile)}
                            </Box>
                        </Box>
                    }
                </Box>
                <Box className="socialrightContainer" >
                    <Typography variant="h7" sx={{display: { xs: 'block', md: 'none' }, opacity: 0, fontFamily: 'Organetto-Stretch'}} className="VerticalWriting"> SOCIAL </Typography>
                    {/* <DownArrowAnimation direction={udDirection}/> */}
                </Box>
            </Container>
        </Box>
    )
}
