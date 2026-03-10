export interface DrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export interface MainContentWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export interface MenuItemData {
  id: string;
  title: string;
  onPress?: () => void;
}
