import { createServer } from "net";

const server = createServer();

server.on("connection", (socket) => {
    // Connection handler here.
});

export default server;
