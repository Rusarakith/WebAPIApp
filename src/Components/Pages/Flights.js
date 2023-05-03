import React, { useEffect, useState, useContext, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { DataGrid, GridToolbarContainer, GridToolbarExportContainer, GridPrintExportMenuItem, GridCsvExportMenuItem } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { useSnackbar } from "notistack";
import FullPageSpinner from "../../Components/Layout/FullPageSpinner";
import { TextField, Grid } from "@mui/material";
import { getAllFlights } from "../../Apis/Flight.api";
import { MsgError } from "../../Common/Constant";
import TopNavigation from "../Layout/TopNavigation";
import AuthContext from '../../Store/AuthManager';

const styles = {
    button: {
        backgroundColor: "#08ee65",
        color: "white",
        textAlign: "center",
        fontSize: "10px",
    },

    buttonDisabled: {
        backgroundColor: "#cfcfcf",
        color: "white",
        textAlign: "center",
        fontSize: "10px",
    },
    viewButton: {
        backgroundColor: "#7D0F14",
        color: "white",
        textAlign: "center",
        fontSize: "10px",
    },
    moreButton: {
        backgroundColor: "#5a5959",
        color: "white",
        textAlign: "center",
        fontSize: "10px",
    },
    convertItem: {
        color: "#B1001D"
    },
    convertededItem: {
        color: "#5a5959"
    }
};

const Flights = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [refreshGrid, setRefreshgrid] = useState(1);
    const [filterUniId, setFilterUniId] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const [updateStatus, setUpdateStatus] = useState("");
    const authCtx = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const gridColumns = [
        {
            field: "flightNo",
            width: 150,
            renderHeader: () => (
                <strong>
                    {'Flight No'}
                </strong>
            ),
        },
        {
            field: "departureDestination",
            width: 200,
            renderHeader: () => (
                <strong>
                    {'Depart. Destination'}
                </strong>
            ),
        },
        {
            field: "arrivalDestination",
            width: 200,
            renderHeader: () => (
                <strong>
                    {'Arrv. Destination'}
                </strong>
            ),
        },
        {
            field: "depatureDate",
            width: 200,
            renderCell: (params) => {

                let date = params.row.depatureDate;
                return (`${new Date(date).toDateString()}`)

            },
            renderHeader: () => (
                <strong>
                    {'Depart. Date'}
                </strong>
            ),

        },
        {
            field: "arrivalDate",
            width: 200,
            renderCell: (params) => {

                let date = params.row.arrivalDate;
                return (`${new Date(date).toDateString()}`)

            },
            renderHeader: () => (
                <strong>
                    {'Arrv. Date'}
                </strong>
            ),

        },
        {
            field: "airline",
            width: 200,
            renderHeader: () => (
                <strong>
                    {'Airline'}
                </strong>
            ),
        },
        {
            field: "isActive",
            width:100,
            renderCell: (params) => {
                if (params.row.isActive != true) {
                    return (
                        <Chip
                            label="REJECTED"
                            sx={{
                                backgroundColor: "#F08080",
                                color: "#B22222",
                                fontSize: "10px",
                                borderRadius: "5px !important",
                            }}
                            size="small"
                        />
                    );
                }
                else {
                    return (
                        <Chip
                            label="ACTIVE"
                            sx={{
                                backgroundColor: "#a6f7b5",
                                color: "#0e8100",
                                fontSize: "10px",
                                borderRadius: "5px !important",
                            }}
                            size="small"
                        />
                    );
                }
            },
            renderHeader: () => (
                <strong>
                    {'Status'}
                </strong>
            ),
        },
        {
            field: "edit",
            headerName: "",
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (<Button
                    sx={{ backgroundColor: "black", color: "white", height:"30px" }}
                    tabIndex={params.hasFocus ? 0 : -1}
                >
                    EDIT
                </Button>)
            },
        }
    ];

    useEffect(() => {
        getAllFlights(authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setFilteredData(result.data);
                    setGridData(result.data);
                }
                else {
                }
            })
            .catch((err) => {
                setIsLoading(false);
                enqueueSnackbar(MsgError, {
                    variant: Error,
                });
            });

    }, [refreshGrid])

    useEffect(() => {
        if (filterUniId.trim()) {
            const filterStudentsDetailTimer = setTimeout(() => {
                if (filterUniId.trim()) {
                    const result = gridData.filter((item) =>
                        item.flightNo.toLowerCase().includes(filterUniId.toLowerCase())
                    );
                    setFilteredData(result);
                } else {
                    setFilteredData([...gridData]);
                }
            }, 250);

            return () => {
                clearTimeout(filterStudentsDetailTimer);
            };
        }
        else {
            setFilteredData([...gridData])
        }

    }, [filterUniId]);

    const filterChangeHandler = (e) => {
        setFilterUniId(e.target.value);
    };



    return (
        <>
            {isLoading && <FullPageSpinner />}
            <Container maxWidth={"xl"} sx={{ pt: 9, height: "90%", pb: "75px" }}>
                <TopNavigation />
                <Grid item xs={12} lg={12} sx={{ pt: 10, display: "flex" }}>
                    <Grid item xs={8} sx={{ display: "flex", width: "100%" }}>
                        <Typography
                            variant=""
                            component=""
                            sx={{ color: "#B0B0B0", fontSize: "20px", fontWeight: "bold" }}
                        >
                            Flight List
                        </Typography>
                    </Grid>
                    <Grid container direction={"row"} item xs={4} lg={4}>
                        <Grid container direction={"row"} item xs={12} lg={12}>
                            <TextField
                                sx={{ marginBottom: "20px", height: "20px", width: "300px" }}
                                label="Filter by Flight No"
                                size="small"
                                variant="outlined"
                                fullWidth={false}
                                onChange={filterChangeHandler}
                                value={filterUniId}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <div style={{ display: "flex", height: "500px", paddingTop: "15px" }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={filteredData}
                            columns={gridColumns}
                            getRowId={(row) => row._id}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10, 15]}
                            sx={{ color: "black" }} />
                    </div>
                </div>
            </Container>
        </>
    );
};
export default Flights;
