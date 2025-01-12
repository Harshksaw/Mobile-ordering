import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer;

export const initializeSocket = (server: HttpServer): void => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");
    // check this

    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
      console.log(`User joined group: ${groupId}`);
    });
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export const getSocketIO = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
export const emitMessageToGroup = (
  group: string,
  event: string,
  message: any
): void => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  io.to(group).emit(event, message);
};
