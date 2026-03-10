import { AppMenuTypes } from "./appMenuTypes";

// activity section view types define here
export type ActivityViewProps = {
    isSearch?: boolean;
    isShowHeader?: boolean;
    title?: string;
    onPressViewAll?: () => void;
    isAction?: boolean;
    onActionClick?: (item: unknown, index: number) => void
};