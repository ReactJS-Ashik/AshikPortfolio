import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Avatar, Box, Typography } from '@mui/material';

import { getMediumUserArticleData } from '../../../Utils/ApiCalls';
import "../../../resources/CSS/mediumPage.css"
import "../../../resources/CSS/sharedComp.css"

export default function MediumPageComponent() {
    const mediumData= useSelector((state) => state.activeNav.activeSocialMenu)
    const [articleData, setarticleData]= useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const articleData= await getMediumUserArticleData();
                setarticleData(JSON.parse(articleData).data)
            } catch (error) {
                setarticleData(null)
            }
        };
        fetchData();
    }, []);
    
    if (articleData) {
        return (
            <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', flex: 1}}>
                <Typography variant='h3' className="fadeIn-riseUp" sx={{fontFamily: 'Brasika-Font', display: {xs: 'none', md: 'block'} }} >Medium User Profile</Typography>
                <Typography variant='h6' className="fadeIn-riseUp" sx={{fontFamily: 'Brasika-Font', display: {xs: 'block', md: 'none'} }} >Medium User Profile</Typography>
                
                <Box className="mediumHeaderData">
                    <Avatar sx={{width: {xs: 100, md: 140}, height: 'auto', margin: '0% 2% 0% 0%' }} className="scaleXY fadeIn-riseRight" src={mediumData.imageUrl} alt="Medium"/>
                    <table className='fadeIn-riseRight'>
                        <tr>
                            <td>
                                <tr>
                                    <td>
                                        <Typography variant='p' sx={{fontFamily: 'Trophy-Font', fontSize: {xs: '70%', md: '100%'}}} > {mediumData.username}</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography variant='p' sx={{fontFamily: 'Trophy-Font', fontSize: {xs: '70%', md: '100%'} }} >{mediumData.name}</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography variant='p' sx={{fontFamily: 'Trophy-Font', fontSize: {xs: '70%', md: '100%'}}} >Total Articles: {articleData.length}+</Typography>
                                    </td>
                                </tr>
                            </td>
                        </tr>
                    </table>
                    <Box sx={{display: 'flex',justifyContent: 'flex-end', border: '0.2px solid green'}}>
                        <Box sx={{position: 'relative'}}>
                            asdf
                        </Box>
                    </Box>
                </Box>
                <Box className="mediumArticleContainer">
                    {articleData && articleData.map((data, index) => {
                        return(
                            <Typography key={index}>
                                {/* {data.title} */}
                            </Typography>
                        )
                    })}
                </Box>
            </Box>
        )
    }
    return(
        <div>
            <h1>Fetching Data</h1>
        </div>
    )
}
