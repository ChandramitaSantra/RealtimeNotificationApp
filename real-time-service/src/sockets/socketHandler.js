let io;

function initializeSocket(server) {
    io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}

function broadcastNotification(notification) {
    if (io) {
        io.emit('notification', notification);
        console.log('Broadcasted notification to all clients:', notification);
    }
}

module.exports = {
    initializeSocket,
    broadcastNotification
};
