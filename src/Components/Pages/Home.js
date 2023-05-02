import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../../Store/AuthManager";
function Home() {
    const authCtx = useContext(AuthContext);

    const logOutHandler = () => {
        authCtx.logout();
    }
    return (
        <>Home
            <button onClick={logOutHandler}>Log out</button></>
    )
}
export default Home;