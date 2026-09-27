export interface AppNotification {
    id: string;
    type: "order" | "message" | "saved" | "promo" | "system";
    title: string;
    description: string;
    time: string; // ISO timestamp
    read: boolean;
}

const STORAGE_KEY = "partlink_notifications";

export function getNotifications(): AppNotification[] {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function addNotification(
    notification: Omit<AppNotification, "id" | "time" | "read">
): void {
    const notifications = getNotifications();

    const newNotification: AppNotification = {
        ...notification,
        id: crypto.randomUUID(),
        time: new Date().toISOString(),
        read: false,
    };

    const updated = [newNotification, ...notifications];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("partlink-notifications-updated"));
}

export function markAllAsRead(): void {
    const notifications = getNotifications().map((n) => ({ ...n, read: true }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    window.dispatchEvent(new Event("partlink-notifications-updated"));
}

export function formatRelativeTime(iso: string): string {
    const diffMs = Date.now() - new Date(iso).getTime();
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;

    const diffDay = Math.floor(diffHr / 24);
    if (diffDay === 1) return "Yesterday";
    if (diffDay < 7) return `${diffDay} days ago`;

    return new Date(iso).toLocaleDateString();
}