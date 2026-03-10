import Toast from 'react-native-simple-toast';

type ToastData = string | null | undefined;

const sanitizeMessage = (data: ToastData): string => data ?? '';

export const ShortTopToaster = (data: ToastData) =>
    Toast.showWithGravity(sanitizeMessage(data), Toast.SHORT, Toast.TOP);

export const LongTopToaster = (data: ToastData) =>
    Toast.showWithGravity(sanitizeMessage(data), Toast.LONG, Toast.TOP);

export const ShortCenterToaster = (data: ToastData) =>
    Toast.showWithGravity(sanitizeMessage(data), Toast.SHORT, Toast.CENTER);

export const LongCenterToaster = (data: ToastData) =>
    Toast.showWithGravity(sanitizeMessage(data), Toast.LONG, Toast.CENTER);

export const ShortBottomToaster = (data: ToastData) =>
    Toast.showWithGravity(sanitizeMessage(data), Toast.SHORT, Toast.BOTTOM);

export const LongBottomToaster = (data: ToastData) =>
    Toast.showWithGravity(sanitizeMessage(data), Toast.LONG, Toast.BOTTOM);

// Optional adapter object for legacy usage
export const ToastAdapter = {
    ShortTopToaster,
    LongTopToaster,
    ShortCenterToaster,
    LongCenterToaster,
    ShortBottomToaster,
    LongBottomToaster,
};


// Usage examples:
// Traditional way (still works)
// import { ToastAdapter } from '../../adapter';
// ToastAdapter.ShortBottomToaster('Hello');