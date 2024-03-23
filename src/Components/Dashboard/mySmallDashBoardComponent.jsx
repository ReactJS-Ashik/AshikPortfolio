import React from 'react'

import { Box, Typography } from '@mui/material'

// importing css
import "../../resources/CSS/dashBoard.css"
import "../../resources/CSS/sharedComp.css"

// importing immages
import pDBImg from "../../resources/Images/portfolio_sm-dboard_img.jpg"
import { socialLinks } from '../../Utils/Constants'

export default function MySmallDashBoardComponent() {
  const Header= [
    {title: "PPoortffolioo", link: ""},
    {title: "aashhikk RRaai", link: ""},
    {title: "Beehindd_PPixLL", link: socialLinks["pinterest"]}]
  return (
    <Box className="DashboardContainer">
        <Box className="imageContainer">
          <img className="pDB_Image fadeIn-riseRightShort" src={pDBImg} />
          <Box className="pDB_Image_effect"></Box>
        </Box>
        <Box className="DashboardData">
            <Box className="HeaderData" sx={{mt: 2, ml: 2}}>
              {Header.map((data, index) => (
                <Typography
                  key={index}
                  className="fadeIn-riseRightShort whiteText"
                  variant='h5'
                  sx={{
                    opacity: 0.8,
                    cursor: 'pointer',
                    fontSize: '80%',
                    m: 0.2,
                    mr: 5,
                    fontFamily: 'StretchPro-Font'
                  }}
                  link={data.link}
                >
                  {data.title}
                </Typography>
              ))}
            </Box>
        </Box>
    </Box>
  )
}
