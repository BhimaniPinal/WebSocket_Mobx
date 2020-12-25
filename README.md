# WebSocket_Mobx
Websocket client webapp using React + Typescript + Mobx

1. Connect - which will initialize a connection to the websocket api - make sure the address is
correct (validate that it starts with ‘wss://’ and let the user know if there is any error)
2. Disconnect - which will disconnect from the websocket api.
3. Send event - which will send the input in the event field (validate you send a valid json)
4. Console - ON and OFF switch for “printing” the messages received from the websocket api -
with OFF, the console does not show at all, with ON - the console does show and print the
outputs to the screen.
5. Clear - which will clear the console
