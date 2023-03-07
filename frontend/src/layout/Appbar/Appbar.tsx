import {AppBar as AppBarMUI, Box, Toolbar, Typography} from "@mui/material"

interface AppbarProps {

}

const Appbar: React.FC<AppbarProps> = () => {


  return (
    <AppBarMUI position="fixed">
      <Toolbar>
        <Box>
         <Typography>Google Suggestion Tool</Typography>
        </Box>
      </Toolbar>
    </AppBarMUI>
  )
}

export default Appbar