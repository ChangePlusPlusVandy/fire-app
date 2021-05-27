"use strict";

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {
    PageContainer,
    Header,
    TitleLine,
    FreeButton,
    Table,
    LogoutButton,
    AdminButtons,
    AdminBtn,
} from "./shared";
import {Link} from "react-router-dom";
import {DevicesTable} from "./devices-table";

export const ChiefAdmin = (props) => {
    let [admin, setAdmin] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        username: "",
        department: "",
        is_authorized: "",
        controllable_firezones: [],
    });

    let [renderDevices, setRenderDevices] = useState(true);

    const showDevices = () => {
        document.getElementById("devicesBtn").style.backgroundColor = "darkgray";
        document.getElementById("firechiefsBtn").style.backgroundColor = "transparent";
        setRenderDevices(true);
    };

    const showFirechiefs = () => {
        document.getElementById("devicesBtn").style.backgroundColor = "transparent";
        document.getElementById("firechiefsBtn").style.backgroundColor = "darkgray";
        setRenderDevices(false);
    };

    return (
        <PageContainer>
            <Header>
                <Link to="" style={{textDecoration: 'none'}}><TitleLine>Fire Mitigation App</TitleLine></Link>
                <Link to="/logout" style={{textDecoration: 'none'}}>
                    <LogoutButton>Logout</LogoutButton>
                </Link>
            </Header>
            <p>Welcome, {admin.first_name}</p>
            <AdminButtons>
                <AdminBtn id="devicesBtn" style={{backgroundColor: "darkgray"}} onClick={showDevices}>Devices</AdminBtn>
                <AdminBtn id="firechiefsBtn" onClick={showFirechiefs}>Firechiefs</AdminBtn>
            </AdminButtons>
            <Table style={{marginTop: "0px"}}>
                <thead>
                <tr>
                    <td style={{width: "30%"}}>Name</td>
                    {renderDevices && <td style = {{width: "25%"}}>Date Added</td>}
                    {!renderDevices && <td style = {{width: "25%"}}>Controllable Firezones</td>}
                    {renderDevices && <td style = {{width: "25%"}}>Firezone</td>}
                    {!renderDevices && <td style = {{width: "25%"}}>Authorized</td>}
                    {renderDevices && <td style = {{width: "25%"}}>Remove</td>}
                    {!renderDevices && <td style = {{width: "25%"}}>Phone</td>}
                </tr>
                </thead>
                {/*<tbody>{renderDevices ? (deviceList) : (firechiefList)}</tbody>*/}
            </Table>
        </PageContainer>
    );
};

ChiefAdmin.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    currentUser: PropTypes.string,
}
