import { Avatar, Box, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'

import defaultDP from "../../resources/Images/defaultDP.png"
import { sideNavMenus } from '../../Utils/Constants'
import { yellowLove } from '../../Utils/ColorConstants';

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSideNav } from '../../Redux/Slicer';

const SideMenuItemContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    marginTop: "14%",
    width: "80%",  
    }));


const SideMenuItem = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: "row",
    padding: "2%",
    margin: "2%",
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

  

const ItemTitle = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })
    (({ theme, active }) => ({
        // padding: "2%",
        fontSize: "120%",
        width: '100%',
        margin: '5%',
        padding: '5%',
        textAlign: "center",
        transition: 'all 0.1s ease-in-out',
        // cursor: 'pointer',
        ... (active && {
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
  

export default function SideNav() {
    const [SN_dp, setSN_dp]= useState(defaultDP);
    const dispatch= useDispatch();

    
    useEffect(() => {
        dispatch(setActiveSideNav({activeSideNav: sideNavMenus[0].title}))
    }, [])

    const activeSideNav= useSelector((state) => state.activeNav.activeSideNav)

    return (
        <Box align="center">
            <Box align="center" style={{marginTop: "7%"}}>
                <Avatar
                    alt="Remy Sharp"
                    src={SN_dp}
                    sx={{ width: "75%", height: "auto" }}
                />
            </Box>
            <SideMenuItemContainer>
                {
                    sideNavMenus.map((data, index) => {
                        return(
                        <SideMenuItem key={index} >
                            {data.icon && 
                                <img width="33"
                                    className="sideNaveMenuIcon"
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
        </Box>
    )
}
