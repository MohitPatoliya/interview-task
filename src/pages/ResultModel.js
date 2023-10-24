import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        fontFamily: 'Poppins',
        fontSize: 24
    }
}));
const ResultModel = (props) => {
    const classes = useStyles()
    const { handleClose, viewResult, open } = props
    return (
        <Dialog
            open={open}
            maxWidth={"xs"}
            fullWidth
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">View Result</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box className={classes.root}>
                        {viewResult ? viewResult.toFixed(0) : 0}%
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ResultModel