import { Box, Skeleton } from '@mui/material'
import { Avatar } from 'antd'
import SkeletonAvatar from 'antd/es/skeleton/Avatar'
import React from 'react'

export default function GithubRepoListSkeleton() {
  return (
    <Box className="SkeletonContainer" >
        <Box className="flexRow" sx={{p: 2}}>
          <SkeletonAvatar animation="wave" size={'large'} sx={{p: 5, border: '2px solid red'}} />
          <Box className="flexColumn" sx={{width: '100%', pl: 1, justifyContent: 'center'}}>
            <Skeleton
                animation="wave"
                height={15}
                width="90%"
            />
            <Skeleton animation="wave" height={10} width="100%" />
          </Box>
        </Box>
    </Box>
  )
}
