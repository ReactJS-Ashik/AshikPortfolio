import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Box, IconButton, Popover, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';

import "../../../resources/CSS/socialprofile.css"
import { getGitHubRepoData } from '../../../Utils/ApiCalls';
import { ArticleRounded, CalendarMonthRounded, CloseOutlined, CloseRounded, CodeRounded, ContentCopyRounded, EditCalendarRounded, IosShareRounded, MailRounded, OpenInNewRounded, TerminalRounded } from '@mui/icons-material';
import useKeyListener from '../../../Utils/KeyListener';
import { Avatar } from 'antd';
import { copyTextToClipBoard, sendGitHubProfileLinkAsMail, sendRepoLinkAsMail } from '../../../Utils/helperFunctions';
import GithubRepoListSkeleton from './GithubRepoListSkeleton';
import LoaderComponent from '../../SharedComponents/LoaderComponent';

function ShareRepoPopupModal(props) {
    const [openDialog, setOpenDialog]= useState(true);
    const [activeOption, setActiveOption]= useState(null)
    function closePopup(){
        props.callBack(null)
        setOpenDialog(false)
    }
    function copyToClipBoard(){
        setActiveOption("CTCB")
        copyTextToClipBoard(props.repoURL);
        // closePopup();
    }
    function sendMail(){
        setActiveOption(null)
        sendRepoLinkAsMail(props.userPorfile, props.repoName, props.repoURL);
        closePopup();
    }
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm')); // Change 'sm' to other breakpoints as needed

    return(
        <Popover
            className=""
            id="ShareRepoPopOver"
            open={openDialog}
            anchorEl={props.anchorEl}
            onClose={closePopup}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <Box sx={{ p: 2}}>
                <Box className="flexRow">
                    <Typography sx={{flex: 1}} variant={isSmallScreen ? 'p' : 'h6'}>Repository Name: {props.title}</Typography>
                    <Tooltip title="Copy" sx={{justifySelf: 'center', alignSelf: 'flex-end', p: 0.30, m: 0.5, bgcolor: '#ebd9fc'}}  onClick={closePopup} >
                        <IconButton size='small'>
                            <CloseRounded fontSize='small' sx={{p: 0.2}}/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box className="flexRow" sx={{pt: 2, pb: 2}}>
                    <TextField sx={{width: '100%', m: 0.5}} size='small' value={props.repoURL} id="outlined-basic" label="Repo Link" focused={true} variant="outlined" />
                    <Tooltip title="Copy" sx={{p: 1, m: 0.5, bgcolor: '#ebd9fc', borderRadius: '7%'}}  onClick={copyToClipBoard} >
                        <IconButton >
                            <ContentCopyRounded className={`${activeOption ? "heartBeatIcon" : null}`} fontSize={isSmallScreen ? 'small':'medium'}/>
                            <div className={`${activeOption ? "fireworkDiv" : null}`} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Mail Link" sx={{p: 1, m: 0.5, bgcolor: '#ebd9fc', borderRadius: '7%'}} onClick={sendMail} >
                         <IconButton >
                            <MailRounded fontSize={isSmallScreen ? 'small':'medium'}/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>       
        </Popover>
    )
}
function ShareProfilePopupModal(props) {
    const [openDialog, setOpenDialog]= useState(true);
    const [activeOption, setActiveOption]= useState(null)
    function closePopup(){
        props.callBack(null)
        setOpenDialog(false)
    }
    function copyToClipBoard(){
        setActiveOption("CTCB")
        copyTextToClipBoard(props.userData.url);
        // closePopup();
    }
    function sendMail(){
        setActiveOption(null)
        sendGitHubProfileLinkAsMail(props.userData);
        closePopup();
    }
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm')); // Change 'sm' to other breakpoints as needed

    return(
        <Popover
            className=""
            id="ShareProfilePopOver"
            open={openDialog}
            anchorEl={props.anchorEl}
            onClose={closePopup}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <Box sx={{ p: 2}}>
                <Typography variant={isSmallScreen ? 'p' : 'h6'}>Github Profile</Typography>
                <Box className="flexRow" sx={{pt: 2, pb: 2}}>
                    <TextField sx={{m: 0.5, width: '100%'}} size='small' value={props.userData.url} id="outlined-basic" label="Profile Link" focused={true} variant="outlined" />
                    <Tooltip title="Copy" sx={{p: 1, m: 0.5, bgcolor: '#ebd9fc', borderRadius: '7%'}} onClick={copyToClipBoard} >
                        <IconButton >
                            <ContentCopyRounded fontSize={isSmallScreen ? 'small':'medium'}/>
                            <div className={`${activeOption ? "fireworkDiv" : null}`} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Mail Link" sx={{p: 1, m: 0.5, bgcolor: '#ebd9fc', borderRadius: '7%'}} onClick={sendMail} >
                         <IconButton>
                            <MailRounded fontSize={isSmallScreen ? 'small':'medium'}/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>       
        </Popover>
    )
}

function CloneRepoPopupModal(props) {
    const [openDialog, setOpenDialog]= useState(true);
    const [activeOption, setActiveOption]= useState(null);

    function closePopup(){
        props.callBack(null)
        setOpenDialog(false)
    }
    function copyToClipBoard(activeOpt){
        setActiveOption(activeOpt)
        copyTextToClipBoard(props.repoURL);
        // closePopup();
    }
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm')); // Change 'sm' to other breakpoints as needed
    
    return(
        <Popover
            className=""
            id="CloneRepoPopOver"
            open={openDialog}
            anchorEl={props.anchorEl}
            onClose={closePopup}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <Box sx={{ p: 2}}>
                <Box className="flexRow">
                    <Typography sx={{flex: 1}} variant={isSmallScreen ? 'p' : 'h6'}>Repository: {props.title}</Typography>
                    <Tooltip title="Copy" sx={{justifySelf: 'center', alignSelf: 'flex-end', p: 0.30, m: 0.5, bgcolor: '#ebd9fc'}}  onClick={closePopup} >
                        <IconButton size='small'>
                            <CloseRounded fontSize='small' sx={{p: 0.2}}/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box className="flexRow" sx={{pt: 2, pb: 2}}>
                    <TextField sx={{width: '100%', m: 0.5}} size='small' value={props.SSH} id="outlined-basic" label="SSH" focused={true} variant="outlined" />
                    <Tooltip title="Copy" sx={{p: 1, m: 0.5, bgcolor: '#ebd9fc', borderRadius: '7%'}}  onClick={() => copyToClipBoard("ssh")} >
                        <IconButton size='small'>
                            <ContentCopyRounded className={`${activeOption && activeOption === "ssh" ? "heartBeatIcon" : null}`} fontSize='small'/>
                            <div className={`${activeOption && activeOption === "ssh" ? "fireworkDiv" : null}`} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box className="flexRow">
                    <TextField sx={{width: '100%', m: 0.5}} size= 'small' value={props.HTTPS} id="outlined-basic" label="HTTPS" focused={true} variant="outlined" />
                    <Tooltip title=" Copy"sx={{p: 1, m: 0.5, bgcolor: '#ebd9fc', borderRadius: '7%'}}  onClick={() => copyToClipBoard("https")} >
                        <IconButton size= 'small'>
                            <ContentCopyRounded className={`${activeOption && activeOption === "https" ? "heartBeatIcon" : null}`} fontSize= 'small'/>
                            <div className={`${activeOption && activeOption === "https" ? "fireworkDiv" : null}`} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>       
        </Popover>
    )
}

export default function GitHubPageComponent(props) {
    const GitHubData= useSelector((state) => state.activeNav.activeSocialMenu)
    const [repoData, setrepoData]= useState(null);
    const [selectedRepo, setselectedRepo]= useState(null);
    const [currTarget, setCurrTarget]= useState(null)
    const numberOfTimes= 7;
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm')); // Change 'sm' to other breakpoints as needed


    useEffect(() => {
        const fetchData = async () => {
            try {
                const repoData= await getGitHubRepoData();
                setrepoData((JSON.parse(repoData).data))
            } catch (error) {
                setrepoData(null)
            }
        };
        fetchData();
    }, []);
    
    const closeSocialProfile = ()=> {props.callback(null)}
    useKeyListener(closeSocialProfile, 'Escape');

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            {selectedRepo !=null && currTarget!= null
            ?
                currTarget.id==="CR2"
                ?
                    <CloneRepoPopupModal title={selectedRepo.name} HTTPS={selectedRepo.clone_url} SSH={selectedRepo.ssh_url} anchorEl={currTarget.event} callBack={setCurrTarget} />
                :
                    <ShareRepoPopupModal userPorfile={GitHubData.url} title={selectedRepo.name} repoName={selectedRepo.name} repoURL={selectedRepo.html_url} anchorEl={currTarget.event} callBack={setCurrTarget} />
            : 
                currTarget != null && currTarget.id === "SP0"
                ?
                    <ShareProfilePopupModal anchorEl={currTarget.event} callBack={setCurrTarget} userData={GitHubData}/>
                :
                    null
            }
            <Box className={`${isSmallScreen ? "socialProfileHeaderColumn custom-small-scrollbar": "socialProfileHeader custom-scrollbar"}`}>
                <Box className="headerActions fadeIn-riseRight absoluteRightTop"  sx={{borderRadius: '7%'}} >
                    <Tooltip title="Close">
                        <IconButton size='small' className="hoverRotate" onClick={()=> props.callback(null)}>
                            <CloseOutlined fontSize='medium' />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box className={ isSmallScreen ? "headerBodyColumn" : "headerBody"} >
                    <Box className={isSmallScreen ? "hide" : "socialDPContainer"}>
                        <img alt="GithubUserDp" className="socialDP fadeIn-riseRight" src={GitHubData.imageUrl} />
                        <Box className={selectedRepo ? "socialDPActionContainer" : "hide"}>
                            <Tooltip title="Open Profile" className="socialProfileActions fadeIn-riseUp" onClick={() => window.open(GitHubData.url, '_blank')}>
                                <IconButton size={isSmallScreen ? 'small' : 'medium'}>
                                    <OpenInNewRounded fontSize={isSmallScreen ? 'small' : 'medium'}/>
                                </IconButton>                        
                                <Typography className="ActionTitle"></Typography>
                            </Tooltip>
                            <Tooltip title="Share Profile" className="socialProfileActions fadeIn-riseUp">
                                <IconButton size={isSmallScreen ? 'small' : 'medium'}>
                                    <IosShareRounded fontSize={isSmallScreen ? 'small' : 'medium'}/>
                                </IconButton>                        
                                <Typography className="ActionTitle" ></Typography>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box className={selectedRepo ? 'hide' : "socialBio"}>
                        <Box sx={{width: {sx: '100%', md: '50%'}}}>
                            <Typography className=" fadeIn-riseUp" variant={isSmallScreen ? "h4" : "h3"} sx={{fontFamily: 'Brasika-Font'}}>{GitHubData.username}</Typography>
                            <Typography className=" fadeIn-riseUp" variant={isSmallScreen ? "h7" : "h7"} sx={{fontSize: '120%', fontFamily: 'Brasika-Font', borderBottom: '5px solid #b8b8ff'}}>GitHub Profile</Typography>
                            <Typography className={`${selectedRepo ? null : "fadeIn-riseRight"} ${isSmallScreen ? "smallFont90" : null}`} variant={isSmallScreen ? "p" : selectedRepo ? "p" : "h6"} sx={{marginLeft: '2%', marginTop: '2%', fontFamily: 'sans-serif', fontSize: {sx: '40%'}}}>
                                {GitHubData.bio}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row', marginTop: '2%', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                            <Tooltip title="Open Profile" className="socialProfileActions fadeIn-riseUp" onClick={() => window.open(GitHubData.url, '_blank')}>
                                <IconButton size={isSmallScreen ? 'small' : 'medium'}>
                                    <OpenInNewRounded fontSize={isSmallScreen ? 'small' : 'medium'}/>
                                </IconButton>                        
                                <Typography className="ActionTitle">Open Profile</Typography>
                            </Tooltip>

                            <Tooltip 
                                title="Share Repository"
                                id="SP0" 
                                className={`
                                    socialProfileActions fadeIn-riseUp 
                                    ${currTarget && currTarget.id==="SP0" ? "activesocialProfileActions" : "socialProfileActions"}
                                `} 
                                onClick={(event) => {setCurrTarget({"id": "SP0", "event":event.currentTarget})}}
                            >
                                <IconButton className="icon" size={isSmallScreen ? 'small' : 'medium'}>
                                    <IosShareRounded fontSize={isSmallScreen ? 'small' : 'medium'}/>
                                    <div className={`${currTarget && currTarget.id === "SP0" ? "fireworkDiv" : null}`} />
                                </IconButton>
                                <Box className="optionContainer">
                                    <Typography className="ActionTitle option-1">Share GitHub Profile</Typography>
                                    <Typography className="ActionTitle option-2">Enjoy Coding ✨</Typography>
                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>
                    {selectedRepo &&
                        <Box className={` ${selectedRepo ? "selectedRepoContainer" : "hide"} ${isSmallScreen ? "custom-small-scrollbar": "custom-scrollbar"} `}>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <Typography variant={`${isSmallScreen ? 'h5' : 'h4'}`} sx={{fontFamily: 'Brasika-Font'}}>{selectedRepo.name}</Typography>
                                <Box>
                                    <Avatar src={selectedRepo.owner.avatar_url} />
                                </Box>
                            </Box>
                            <Typography variant='p' className={`${isSmallScreen ? "smallFont75" : null}`}>{selectedRepo.description}</Typography>
                            <Box className="flexColumn marginUpBottom">
                                <Typography variant='p' sx={{p: 0.5}} className={`flexRowVCenter ${isSmallScreen ? "smallFont75" : null}`}> <CodeRounded /> <b style={{margin: "0% 1% 0% 1%"}}>Language:</b> {selectedRepo.language}</Typography>
                                {selectedRepo.license && 
                                    <Typography 
                                        overflow="clip" 
                                        variant='p'
                                        sx={{p: 0.5}}
                                        className={`flexRowVCenter ${isSmallScreen ? "smallFont75" : null}`}
                                    >
                                        <ArticleRounded />
                                        <b style={{margin: "0% 1% 0% 1%"}}>License:</b> 
                                        {selectedRepo.license.name}
                                    </Typography>
                                }
                                <Typography variant='p' sx={{p: 0.5}} className={`flexRowVCenter ${isSmallScreen ? "smallFont75" : null}`}><CalendarMonthRounded /><b style={{margin: "0% 1% 0% 1%"}}> Created on:</b> {selectedRepo.created_at}</Typography>
                                <Typography variant='p' sx={{p: 0.5}} className={`flexRowVCenter ${isSmallScreen ? "smallFont75" : null}`}><EditCalendarRounded /><b style={{margin: "0% 1% 0% 1%"}}> Last Updated on:</b> {selectedRepo.updated_at}</Typography>
                            </Box>

                            <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Tooltip title="Open Repository" className="repoDataIcons socialProfileActions fadeIn-riseUp" onClick={() => window.open(selectedRepo.html_url, '_blank')}>
                                    <IconButton size={isSmallScreen ? 'small' : 'medium'}>
                                        <OpenInNewRounded fontSize={isSmallScreen ? 'small' : 'medium'}/>
                                    </IconButton>                        
                                    <Typography className="ActionTitle">{isSmallScreen ? "Open Repo" : "Open Repository"}</Typography>
                                </Tooltip>
                                <Tooltip 
                                    title="Share Repository"
                                    id="SR1" 
                                    className={`
                                        repoDataIcons fadeIn-riseUp 
                                        ${currTarget && currTarget.id==="SR1" ? "activesocialProfileActions" : "socialProfileActions"}
                                    `} 
                                    onClick={(event) => {setCurrTarget({"id": "SR1", "event":event.currentTarget})}}
                                >
                                    <IconButton className="icon" size={isSmallScreen ? 'small' : 'medium'}>
                                        <IosShareRounded fontSize={isSmallScreen ? 'small' : 'medium'}/>
                                        <div className={`${currTarget && currTarget.id === "SR1" ? "fireworkDiv" : null}`} />
                                    </IconButton>
                                    <Box className="optionContainer">
                                        <Typography className="ActionTitle option-1">{isSmallScreen ? "Share Repo" : "Share Repository"}</Typography>
                                        <Typography className="ActionTitle option-2">Enjoy Coding ✨</Typography>
                                    </Box>
                                </Tooltip>
                                <Tooltip 
                                    title="Clone Repository"
                                    id="CR2" 
                                    className={`
                                        repoDataIcons fadeIn-riseUp 
                                        ${currTarget && currTarget.id==="CR2" ? "activesocialProfileActions" : "socialProfileActions"}
                                    `}
                                    onClick={(event) => {setCurrTarget({"id": "CR2", "event":event.currentTarget})}}
                                >
                                    <IconButton className="icon" size={isSmallScreen ? 'small' : 'medium'}>
                                        <TerminalRounded fontSize={isSmallScreen ? 'small' : 'medium'}/>
                                        <div className={`${currTarget && currTarget.id === "CR2" ? "fireworkDiv" : null}`} />
                                    </IconButton>
                                    
                                    <Box className="optionContainer">
                                        <Typography className="ActionTitle option-1">{isSmallScreen ? "Clone Repo" : "Clone Repository"}</Typography>
                                        <Typography className="ActionTitle option-2">Enjoy Coding ✨</Typography>
                                    </Box>
                                </Tooltip>
                            </Box>
                        </Box>
                    }
                </Box>  
            </Box>
            <Typography variant='h4' sx={{marginTop: '2%',fontFamily: 'Brasika-Font',}}> My GitHub Achievements ✨</Typography>        
            {repoData
            ?
                <Box className={`socialProfileBody ${ isSmallScreen ? "custom-small-scrollbar" : "custom-scrollbar"}`}>
                    {repoData && repoData.map((data) => (
                        <Box 
                            className={`
                                ${isSmallScreen ? 'socialBodyItemColumn' : 'socialBodyItem'} 
                                fadeIn-riseUp 
                                ${selectedRepo && selectedRepo.id === data.id ? "activeSocialBodyItem" : null }
                            `}
                            key={data.id}
                            onClick={() => setselectedRepo(data)}
                        >
                            <Box>
                                <Avatar size='large' src={data.owner.avatar_url} />
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '2%'}}>
                                <Typography variant='p' sx={{ fontWeight: 'bold'}} className={isSmallScreen ? "smallFont75" : "Truncate"}>
                                    RepoName: {data.name}
                                </Typography>
                                <Typography variant='p'  className={isSmallScreen ? "smallFont75" : "Truncate"}>
                                    {data.full_name}
                                </Typography>
                            </Box>   
                        </Box>
                    ))}
                </Box>
            :
                <>
                    <Typography variant='p' sx={{marginTop: '2%',fontFamily: 'StretchPro-Font', textAlign: 'center'}}> Please wait while Github is packing the repository list. </Typography>
                    <Box sx={{display: 'flex', justifyContent:'center'}}>
                        <LoaderComponent />
                    </Box>

                    {
                        Array.from({ length: numberOfTimes/2 }, (_, index) => (
                            <Box className={`flexRow ${ isSmallScreen ? "custom-small-scrollbar" : "custom-scrollbar"}`}>
                                {
                                    Array.from({ length: numberOfTimes/2 }, (_, index) => (
                                        <Box sx={{flex: 1, m: 1}} key={index} className={`fadeIn-riseUp`}>
                                            <GithubRepoListSkeleton key={index} />
                                        </Box>
                                    ))
                                }
                            </Box>
                        ))
                    }
                </>
            }
        </Box>
    )
}
