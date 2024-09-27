import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'

export default function TypeWriterContent(props) {

    const IntroContent= () => {
        return(
            <>
                <Typography
                    variant='p'
                    className={`typewriter ${props.isSmallScreen ? "smallFont55" : null}`}
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >
                    <big>01 </big>
                    <ChevronLeftRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                     Greetings❗ I am
                     <color className="left-margin-by-1 orangeText right-margin-by-1"> Ashik Rai, </color>
                     {/* and I extend */}
                    <ChevronRightRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                </Typography>

                <Typography
                    variant='p'
                    className={`typewriter ${props.isSmallScreen ? "smallFont55" : null}`}
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >
                    <big>02 </big>
                    <ChevronLeftRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                    a warm Welcome to my
                    <color className="orangeText left-margin-by-1 right-margin-by-1"> Portfolio. </color>
                    {/* Here, you can freely */}
                    <ChevronRightRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                </Typography>

                <Typography
                    variant='p'
                    className={`typewriter ${props.isSmallScreen ? "smallFont55" : null}`}
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >
                    <big>03 </big>
                    <ChevronLeftRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`} />
                        <color className="orangeText right-margin-by-1">
                            Explore my works and projects.
                        </color>
                        {/* Dont hesitate to connect with me. */}
                    <ChevronRightRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                    <caret className="caret" />
                </Typography>
            </>
        )
    }

    const bioContent= () => {
        return(
            <>
                <Typography
                    variant='p'
                    className={`typewriter ${props.isSmallScreen ? "smallFont55" : null}`}
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >
                    <big>01 </big>
                    <ChevronLeftRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                     I am a
                     <color className="left-margin-by-1 orangeText right-margin-by-1"> 
                        Software Engineer 🧑‍💻
                    </color>
                    <ChevronRightRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                </Typography>

                <Typography
                    variant='p'
                    className={`typewriter ${props.isSmallScreen ? "smallFont55" : null}`}
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >
                    <big>02 </big>
                    <ChevronLeftRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                        currently working at <color className="orangeText left-margin-by-1 right-margin-by-1"> AMADEUS </color>
                        {/* with experience on */}
                    <ChevronRightRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                </Typography>

                <Typography
                    variant='p'
                    className={`typewriter ${props.isSmallScreen ? "smallFont55" : null}`}
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >
                    <big>03 </big>
                    <ChevronLeftRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`} />
                        {/* tools such as */}
                        also an enthusiast
                        <color className="left-margin-by-1 orangeText right-margin-by-1">
                            Full Stack Developer
                        </color>
                    <ChevronRightRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                    <caret className="caret" />
                </Typography>
            </>
        )
    }

    const SocialContent= () => {
        return(
            <>
                <Typography
                    variant='p'
                    className={`typewriter ${props.isSmallScreen ? "smallFont75" : null}`}
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >
                    <big>01 </big>
                    <ChevronLeftRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                    Stay updated with my <color className="left-margin-by-1 orangeText"> Medium Blogs </color>
                    <ChevronRightRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                </Typography>

                <Typography
                    variant='p'
                    className={`typewriter ${props.isSmallScreen ? "smallFont75" : null}`}
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >
                    <big>02 </big>
                    <ChevronLeftRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                    and <color className="orangeText left-margin-by-1 right-margin-by-1"> latest projects  </color>
                    posted on GitHub
                    <ChevronRightRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                </Typography>

                <Typography
                    variant='p'
                    className={`typewriter ${props.isSmallScreen ? "smallFont75" : null}`}
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >
                    <big>03 </big>
                    <ChevronLeftRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`} />
                        <color className="orangeText right-margin-by-1">
                            Lets Connect, 
                        </color>
                        over social Hubs.
                    <ChevronRightRounded fontSize={`${props.isSmallScreen ? 'small':'medium'}`}/>
                    <caret className="caret" />
                </Typography>
            </>
        )
    }

    const functionMap= {
        0: IntroContent(),
        1: bioContent(),
        2: SocialContent()
    }

    if (functionMap[props.content])
        return functionMap[props.content]
    return bioContent()
}
