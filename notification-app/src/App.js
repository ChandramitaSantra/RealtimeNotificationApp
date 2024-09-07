import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5002'); // Ensure this URL matches your backend

const App = () => {
    const [notifications, setNotifications] = useState([]);

    // Listen for new notifications in real-time
    useEffect(() => {
        socket.on('notification', (notification) => {
          console.log(notification);
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        });
        console.log("ok");

        // Cleanup the event listener when component unmounts
        // return () => {
        //     socket.off('newNotification');
        // };
    }, []);

    // Mark a notification as read
    const markAsRead = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/notifications/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedNotificationid = id;
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notification) =>
                        notification._id === updatedNotificationid
                            ? { ...notification, read: true }
                            : notification
                    )
                );
            } else {
                console.error('Failed to mark notification as read');
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Real-Time Notifications</h1>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification._id} style={{ marginBottom: '10px' }}>
                        <p>{notification.message}</p>
                        <p>Status: {notification.read ? 'Read' : 'Unread'}</p>
                        {!notification.read && (
                            <button onClick={() => markAsRead(notification._id)}>
                                Mark as Read
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
