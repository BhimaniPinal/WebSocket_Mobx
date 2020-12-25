
import { observer } from "mobx-react-lite";
import { DashBoardViewModel } from "./DashBoardViewModel";
import React from "react";
import Card from '@material-ui/core/Card';
import { Grid, Button, Switch } from "@material-ui/core";
import './DashBoard.css'
import TextField from '@material-ui/core/TextField';

const DashBoard: React.FunctionComponent<{ vm: DashBoardViewModel }> = observer(({ vm }) => {
    const {
        wssUrl,
        showOutput,
        eventPayload,
        webSocketOutput,
        handleSend,
        handleClear,
        handleConnect,
        handleDisconnect,
        handleShowOutput,
        setWssUrl,
        setEventPayload,
        isValidAddress,
        isValidJSONString
    } = vm;

    return (
        <>
            <Card className="wrapper">
                <Grid container spacing={8}>
                    <Grid item xs={6}>
                        <TextField
                            className="input-field"
                            label="Enter wss url"
                            variant="outlined"
                            value={wssUrl}
                            onChange={setWssUrl} />
                        {
                            wssUrl && !isValidAddress && (<span className="error-message">Please enter valid wss url</span>)
                        }
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary" onClick={handleConnect}>
                            Connect
                            </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="secondary" onClick={handleDisconnect}>
                            Disconnect
                            </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className="input-field"
                            label="Event Payload"
                            variant="outlined"
                            value={eventPayload}
                            onChange={setEventPayload} />
                        {
                            eventPayload && !isValidJSONString && (
                                <span className="error-message">Please enter valid json string</span>
                            )
                        }
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="default" onClick={handleSend}>
                            Send
                            </Button>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6} className="switch-block">
                        on
                            <Switch
                            checked={showOutput}
                            onChange={handleShowOutput}
                            color="primary"
                            className="clear-switch"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        off
                        </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="default" onClick={handleClear}>
                            Clear
                            </Button>
                    </Grid>
                    {
                        showOutput &&
                        <Grid item xs={12} >
                            <TextField
                                className="input-field"
                                label="Websocket output"
                                multiline
                                rows={15}
                                value={webSocketOutput}
                                disabled
                                variant="outlined"
                            />
                        </Grid>
                    }
                </Grid>
            </Card>
        </>
    )

})



export default DashBoard;