import { Box } from "@mui/material"
import React from "react"
import Appbar from "./Appbar";

interface LayoutProps {
    children: React.ReactNode | undefined
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar />
      <Box sx={{ flexGrow: 1, p: 1, pt: 1 }}>{children}</Box>
    </Box>
  )
}

export default Layout
