import React from 'react'

import { Box, Typography } from '@mui/material'

// importing css
import "../../resources/CSS/dashBoard.css"
import "../../resources/CSS/sharedComp.css"

// importing immages
import pDBImg from "../../resources/Images/portfolio_dboard_img.png"
import { socialLinks } from '../../Utils/Constants'
import { openLink } from '../../Utils/helperFunctions'

export default function MyDashboardComponent() {
  const Header= [
    {title: "PPoortffolioo", link: null},
    {title: "aashhikk RRaai", link: null},
    {title: "Beehindd_PPixLL", link: socialLinks["pinterest"]}]
  return (
    <Box className="DashboardContainer">
        <Box className="imageContainer">
          <img className="pDB_Image fadeIn-riseRightShort" alt="dashboardImage" src={pDBImg} />
          <Box className="pDB_Image_effect"></Box>
        </Box>
        <Box className="DashboardData">
            <Box className="HeaderData">
              {Header.map((data, index) => (
                <Typography
                  key={index}
                  className="fadeIn-riseRightShort whiteText"
                  variant='h5'
                  sx={{
                    opacity: 0.8,
                    cursor: 'pointer',
                    fontFamily: 'StretchPro-Font'
                  }}
                  onClick={() => openLink(data.link)}
                >
                  {data.title}
                </Typography>
              ))}
            </Box>
        </Box>
    </Box>
  )
}
