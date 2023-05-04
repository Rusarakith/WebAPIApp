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
    AccordionDetails,FormControl, InputLabel, MenuItem, FormHelperText
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

const PackageAddPopup = ({ title, isOpen, onClose, flightList, hotelList, onAdd }) => {
    const [name, setName] = useState("")
    const [endDate, setendDate] = useState(dayjs(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate()) + "T05:30:00.000"));
    const [startDate, setstartDate] = useState(dayjs(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate()) + "T05:30:00.000"));
    const [flightId, setFlightId] = useState();
    const [hotelId, setHotelId] = useState();
    const [price, setPrice] = useState();
    const [headsPerPackage, setHeadsPerPackage] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const OnDepartDateChange = (date) => {
        setstartDate(new Date(new Date(date).toISOString()));
    }

    const OnArrvDateChange = (date) => {
        setendDate(new Date(new Date(date).toISOString()));
    }

    const onUpdateHandler = () => {
        let packageObject = {
            name: name,
            endDate: endDate,
            startDate: startDate,
            price: price,
            flightId: flightId,
            hotelId: hotelId,
            headsPerPackage: headsPerPackage,
        }

        onAdd(packageObject);
    }

    const flightType = (event) => {
        setFlightId(event.target.value)
    }

    const hotelType = (event) => {
        setHotelId(event.target.value)
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
                onSave={onUpdateHandler}
            >
                <Box sx={{ height: "350px", width: "800px", p: 1 }}>
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
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={12}>
                                        <TextField
                                            label="Package Name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item lg={6}>
                                        <Typography variant="subtitle1">Start Date</Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography variant="subtitle1">End Date</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item lg={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                value={startDate}
                                                onChange={(newValue) => {
                                                    OnDepartDateChange(newValue);
                                                }}
                                                slotProps={{
                                                    textField: {
                                                        helperText: ""

                                                    },
                                                }}
                                                sx={{ width: "370px" }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                value={endDate}
                                                onChange={(newValue) => {
                                                    OnArrvDateChange(newValue);
                                                }}
                                                slotProps={{
                                                    textField: {
                                                        helperText: ""

                                                    },
                                                }}
                                                sx={{ width: "370px" }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Price"
                                            name="price"
                                            value={price}
                                            onChange={(e) => {
                                                setPrice(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            label="Heads Per Package"
                                            name="headsPerPackage"
                                            value={headsPerPackage}
                                            onChange={(e) => {
                                                setHeadsPerPackage(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction={"row"} item lg={12} spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl >
                                            <InputLabel id="demo-simple-select-label">Flight</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                value={flightId}
                                                label="User Type"
                                                onChange={flightType}
                                                sx={{width:"370px"}}
                                            >
                                                {flightList ? flightList.map((item) => (
                                                    <MenuItem value={`${item._id}`}>{`${item.flightNo}`}</MenuItem>
                                                )) : <></>}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                    <FormControl >
                                            <InputLabel id="demo-simple-select-label">Hotel</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                value={hotelId}
                                                label="User Type"
                                                onChange={hotelType}
                                                sx={{width:"370px"}}
                                            >
                                                {hotelList ? hotelList.map((item) => (
                                                    <MenuItem value={`${item._id}`}>{`${item.hotelName}`}</MenuItem>
                                                )) : <></>}
                                            </Select>
                                        </FormControl>
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

export default PackageAddPopup;
