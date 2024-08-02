import { Box } from '@mui/material'
import React from 'react'


const Profile = ({ user, additionalInfo }) => {
  return (
    <>
        <Box sx={{ height: '76vh' }}>
            {additionalInfo ?  `hi ${additionalInfo.username}`  : "hi"}
        </Box>
    </>
  )
}

export default Profile