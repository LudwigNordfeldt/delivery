import { Button } from "@mui/material"
import { useCallback } from "react"

const LogOut = ({onComplete}) => {
    const logOut = useCallback( () => {
        window.localStorage.removeItem("loggedUser")
        onComplete(null)
    }, [onComplete])
    return (<Button variant="contained" sx={{backgroundColor: 'lightcoral'}} onClick={logOut}>Log out</Button>)
}

export default LogOut