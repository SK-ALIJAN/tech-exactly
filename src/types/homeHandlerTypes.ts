import { AppMenuTypes } from "./appMenuTypes";

// Home Handler props define here
export type HomeHandlerProps = {
    selectedAppMenu?: AppMenuTypes;
    onPressViewAll?: (sectionId: AppMenuTypes) => void;
};
