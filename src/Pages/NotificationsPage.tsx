import "./NotificationsPage.css";
import { useState, useEffect } from "react";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import {
    FaShoppingBag,
    FaHeart,
    FaCommentDots,
    FaTag,
    FaCheckCircle,
    FaBellSlash,
} from "react-icons/fa";
import { getNotifications, formatRelativeTime } from "../utils/notifications";
import type { AppNotification } from "../utils/notifications";

const ICONS: Record<AppNotification["type"], React.ReactNode> = {
    order: <FaShoppingBag />,
    message: <FaCommentDots />,
    saved: <FaHeart />,
    promo: <FaTag />,
    system: <FaCheckCircle />,
};

function NotificationsPage() {
    const [notifications, setNotifications] = useState<AppNotification[]>([]);

    useEffect(() => {
        const load = () => setNotifications(getNotifications());
        load();

        window.addEventListener("partlink-notifications-updated", load);
        window.addEventListener("storage", load);

        return () => {
            window.removeEventListener("partlink-notifications-updated", load);
            window.removeEventListener("storage", load);
        };
    }, []);

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="notificationsPageWrapper">
            <NavigationBar />

            <div className="notificationsLayout">
                <div className="notificationsPageHeader">
                    <h1>Notifications</h1>
                    <p>
                        {notifications.length === 0
                            ? "Nothing here yet"
                           : unreadCount > 0
                            ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                            : "You're all caught up"}
                    </p>
                </div>

                {notifications.length === 0 ? (
                    <div className="notificationsEmptyState">
                        <FaBellSlash className="notificationsEmptyIcon" />
                        <p>You don't have any notifications yet.</p>
                        <span>Updates about your orders, messages, and account will show up here.</span>
                    </div>
                ) : (
                    <div className="notificationsList">
                        {notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`notificationCard ${!n.read ? "notificationUnread" : ""}`}
                            >
                                <span className={`notificationIconBadge notificationIcon-${n.type}`}>
                                    {ICONS[n.type]}
                                </span>
                                <div className="notificationContent">
                                    <div className="notificationTopRow">
                                        <strong>{n.title}</strong>
                                        <span className="notificationTime">
                                            {formatRelativeTime(n.time)}
                                        </span>
                                    </div>
                                    <p>{n.description}</p>
                                </div>
                                {!n.read && <span className="notificationDot" />}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default NotificationsPage;