import React, { useEffect, useState, useContext, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { DataGrid, GridToolbarContainer, GridToolbarExportContainer, GridPrintExportMenuItem, GridCsvExportMenuItem } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { useSnackbar } from "notistack";
import FullPageSpinner from "../Layout/FullPageSpinner";
import { TextField, Grid, Switch, FormControlLabel } from "@mui/material";
import { Error, MsgError, Success } from "../../Common/Constant";
import AuthContext from '../../Store/AuthManager';
import AddIcon from '@mui/icons-material/Add';
import TopNavigationAdmin from "../Layout/TopNavigationAdmin";
import { addUser, getAllUsers, updateUser } from "../../Apis/User.api";
import { getAllRoles } from "../../Apis/Role.api";
import UserAddPopup from "../UserAddPopup";
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

const Users = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [refreshGrid, setRefreshgrid] = useState(1);
    const [userName, setuserName] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [selecteduserName, setSelecteduserName] = useState("");
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [addUserPopupOpen, setaddUserPopupOpen] = useState(false);
    const [updatedList, setUpdatedList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const authCtx = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const gridColumns = [
        {
            field: "name",
            width: 400,
            valueGetter: getUserName,
            renderHeader: () => (
                <strong>
                    {'Name'}
                </strong>
            ),
        },
        {
            field: "email",
            width: 450,
            renderHeader: () => (
                <strong>
                    {'E-mail'}
                </strong>
            ),
        },
        {
            field: "role",
            width: 450,
            renderHeader: () => (
                <strong>
                    {'Role'}
                </strong>
            ),
        },
        {
            field: "isActive",
            width: 100,
            editable: true,
            renderCell: (params) => {
                if (params.row.isActive != true) {
                    return (
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={false}
                                    onChange={() => IsActiveChangeHandler(params.row.id)}
                                />
                            } />
                    );
                }
                else {
                    return (
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={true}
                                    onChange={() => IsActiveChangeHandler(params.row.id)}
                                />
                            } />
                    );
                }
            },
            renderHeader: () => (
                <strong>
                    {'Status'}
                </strong>
            ),
        }
    ];

    function getUserName(params) {
        return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
    }

    useEffect(() => {
        getAllUsers(authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setFilteredData(result.data);
                    setGridData(result.data);
                    console.log(result.data)
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
        getAllRoles(authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setRoleList(result.data);
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

    }, [])

    useEffect(() => {
        if (userName.trim()) {
            const filterHotelDetailTimer = setTimeout(() => {
                if (userName.trim()) {
                    const result = gridData.filter((item) =>
                        item.firstName.toLowerCase().includes(userName.toLowerCase()) || item.lastName.toLowerCase().includes(userName.toLowerCase())
                    );
                    setFilteredData(result);
                } else {
                    setFilteredData([...gridData]);
                }
            }, 250);

            return () => {
                clearTimeout(filterHotelDetailTimer);
            };
        }
        else {
            setFilteredData([...gridData])
        }

    }, [userName]);

    const IsActiveChangeHandler = (id) => {
        setIsVisible(true);
        const newState = filteredData.map(obj => {
            if (obj.id === id) {
                return { ...obj, isActive: !obj.isActive };
            }
            return obj;
        });
        setFilteredData(newState);
        let updatedRecord = ([...newState.filter(item=>item.id === id)]);
        const userObj = {
            'id':id,
            'isActive':updatedRecord[0].isActive
        }
        onUserEdit(userObj)

    };

    const filterChangeHandler = (e) => {
        setuserName(e.target.value);
    };

    const onUserEdit = (userData) => {
        setEditPopupOpen(false);
        setIsLoading(true);
        updateUser(userData, authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setRefreshgrid(refreshGrid + 1)
                    enqueueSnackbar(result.message, {
                        variant: Success,
                    });
                } else {
                    enqueueSnackbar(result.message, {
                        variant: Error,
                    });
                }
            })
            .catch((err) => {
                setIsLoading(false);
                enqueueSnackbar(MsgError, {
                    variant: Error,
                });
            });

    }

    const onUserAdd = (userData) => {
        setaddUserPopupOpen(false);
        setIsLoading(true);
        addUser(userData, authCtx.token)
            .then((result) => {
                setIsLoading(false);
                if (result.status === 200) {
                    setRefreshgrid(refreshGrid + 1)
                    enqueueSnackbar(result.message, {
                        variant: Success,
                    });
                } else {
                    enqueueSnackbar(result.message, {
                        variant: Error,
                    });
                }
            })
            .catch((err) => {
                setIsLoading(false);
                enqueueSnackbar(MsgError, {
                    variant: Error,
                });
            });

    }

    const addUserPopupOpenHandler = () => {
        setaddUserPopupOpen(true);
    }

    return (
        <>
            {isLoading && <FullPageSpinner />}
            <Container maxWidth={"xl"} sx={{ pt: 9, height: "90%", pb: "75px" }}>
                <TopNavigationAdmin />
                <Grid item xs={12} lg={12} sx={{ pt: 10, display: "flex" }}>
                    <Grid item xs={8} sx={{ display: "flex", width: "100%" }}>
                        <Grid>
                            <Typography
                                variant=""
                                component=""
                                sx={{ color: "#B0B0B0", fontSize: "20px", fontWeight: "bold" }}
                            >
                                User List
                            </Typography>
                        </Grid>
                        <Grid paddingLeft={3} paddingBottom={2}>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{ backgroundColor: "green" }}
                                onClick={addUserPopupOpenHandler}
                            >
                                Add New User
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction={"row"} item xs={4} lg={4}>
                        <Grid container direction={"row"} item xs={12} lg={12}>
                            <TextField
                                sx={{ marginBottom: "20px", height: "20px", width: "300px" }}
                                label="Filter by Name"
                                size="small"
                                variant="outlined"
                                fullWidth={false}
                                onChange={filterChangeHandler}
                                value={userName}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <div style={{ display: "flex", height: "500px", paddingTop: "15px" }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={filteredData}
                            columns={gridColumns}
                            getRowId={(row) => row.id}
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
            {
                addUserPopupOpen ? (
                    <UserAddPopup
                        title="USER ADD POPUP"
                        isOpen={addUserPopupOpen}
                        onClose={setaddUserPopupOpen}
                        roleList={roleList}
                        onAdd={onUserAdd}
                    />
                ) : (
                    <></>
                )
            }
        </>
    );
};
export default Users;
