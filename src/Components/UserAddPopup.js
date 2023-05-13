import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Typography,
    Select,
    Button,
    Stack,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails, FormControl, InputLabel, MenuItem, FormHelperText
} from "@mui/material";
import { useSnackbar } from "notistack";
import AuthContext from "../Store/AuthManager";
import TextField from "./UI/TextField";
import Modal from "./UI/Modal";
import FullPageSpinner from "./Layout/FullPageSpinner";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "./FlightEditPopup.css";

const UserAddPopup = ({ title, isOpen, onClose, roleList, onAdd }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userTypeId, setUserTypeId] = useState("");
    const [nic, setNic] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const onAddHandler = () => {
        let userObject = {
            firstName: firstName,
            lastName: lastName,
            roleId: userTypeId,
            email: email,
            password: password
        }

        onAdd(userObject);
    }

    const userType = (event) => {
        setUserTypeId(event.target.value)
    }

    return (
        <iframe id="printf">
            <Modal
                title={title}
                isOpen={isOpen}
                onClose={onClose}
                button1={"Close"}
                button2={"Add"}
                hideButton2={false}
                onSave={onAddHandler}
            >
                <Box sx={{ height: "280px", width: "800px", p: 1 }}>
                    {isLoading && <FullPageSpinner isSubWrapper={true} />}
                    {!isLoading && <Box>
                        <Paper
                            variant="none"
                            sx={{
                                width: "800px",
                                justifyContent: "center",
                                border: "2px ",
                                borderRadius: "0px",

                            }}
                        >
                            <Grid container direction={"column"} items lg={12} spacing={2} paddingTop={2} paddingLeft={3} paddingBottom={2} >
                                <Grid container direction={"row"} item lg={12}>
                                    <FormControl >
                                        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={userTypeId}
                                            label="User Type"
                                            onChange={userType}
                                            sx={{ width: "370px" }}
                                        >
                                            {roleList ? roleList.map((item) => (
                                                <MenuItem value={`${item._id}`}>{`${item.name}`}</MenuItem>
                                            )) : <></>}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="First Name"
                                            name="name"
                                            value={firstName}
                                            onChange={(e) => {
                                                setFirstName(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Last Name"
                                            name="name"
                                            value={lastName}
                                            onChange={(e) => {
                                                setLastName(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="E-mail"
                                            name="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="National Identity Card"
                                            name="nic"
                                            value={nic}
                                            onChange={(e) => {
                                                setNic(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={12}>
                                        <TextField
                                            label="Password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>}
                </Box>
            </Modal>
        </iframe>
    );
};

export default UserAddPopup;
