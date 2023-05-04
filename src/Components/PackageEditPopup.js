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

const PackageEditPopup = ({ title, isOpen, onClose, data, flightList, hotelList, onEdit }) => {
    console.log(data[0].startDate)
    const [name, setName] = useState(data[0].name)
    const [endDate, setendDate] = useState("");
    const [startDate, setstartDate] = useState("");
    const [flightId, setFlightId] = useState(data[0].flightId);
    const [hotelId, setHotelId] = useState(data[0].hotelId);
    const [price, setPrice] = useState(data[0].price);
    const [headsPerPackage, setHeadsPerPackage] = useState(data[0].headsPerPackage);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setstartDate(dayjs(new Date(data[0].startDate).getFullYear() + "-" + (new Date(data[0].startDate).getMonth() + 1) + "-" + (new Date(data[0].startDate).getDate()) + "T" + (new Date(data[0].startDate).getHours()) + ":" + (new Date(data[0].startDate).getMinutes()) + ":" + (new Date(data[0].startDate).getSeconds()) + "." + (new Date(data[0].startDate).getMilliseconds())));
        setendDate(dayjs(new Date(data[0].endDate).getFullYear() + "-" + (new Date(data[0].endDate).getMonth() + 1) + "-" + (new Date(data[0].endDate).getDate()) + "T" + (new Date(data[0].endDate).getHours()) + ":" + (new Date(data[0].endDate).getMinutes()) + ":" + (new Date(data[0].endDate).getSeconds()) + "." + (new Date(data[0].endDate).getMilliseconds())));
    }, []);

    const authCtx = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const OnDepartDateChange = (date) => {
        setendDate(new Date(new Date(date).toISOString()));
    }

    const OnArrvDateChange = (date) => {
        setstartDate(new Date(new Date(date).toISOString()));
    }

    const onUpdateHandler = () => {
        let packageObject = {
            id: data[0]._id,
            name: name,
            endDate: endDate,
            startDate: startDate,
            price: price,
            flightId: flightId,
            hotelId: hotelId,
            headsPerPackage: headsPerPackage,
        }

        onEdit(packageObject);
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
                button2={"Edit"}
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

export default PackageEditPopup;
