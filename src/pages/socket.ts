import io from "socket.io-client";

const socket = io("https://facebook-oauth-ihe6.onrender.com",{
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("Socket connected!");
});

export default socket;