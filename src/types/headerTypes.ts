// headre page types define here

import { Source } from "react-native-fast-image";
import { AppMenuTypes } from "./appMenuTypes";
import { ImageRequireSource } from "react-native";

export type HeaderProps = {
    title?: string;
    userName?: string;
    userRole?: string;
    userImage?: Source | ImageRequireSource;
    onProfilePress?: (sectionId: AppMenuTypes) => void;
    onNotificationPress?: (sectionId: AppMenuTypes) => void;
    isBorderBottom?: boolean;
    toggleDrawer?: () => void;
};



// for header list items name
export enum HeaderNames {
    Dashboard = 'Dashboard',
    Reservations = 'Reservations',
    ReservationList = 'Reservations',
    ReservationDetails = 'Reservation Details',
    Orders = 'Orders',
    OrderList = 'Orders',
    Tips = 'Tips',
    TipList = 'Tips',
    Settings = 'Settings',
    Notification = 'Notification',
    PrivacyPolicy = 'Privacy Policy',
    TermsConditions = 'Terms & Conditions',
    ChangePassword = 'Change Password',
    Logout = 'Logout',
    MyProfile = 'My Profile'
}