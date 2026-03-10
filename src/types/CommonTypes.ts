import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenParamList} from '../../Adapter/Navigation/screenTypes';

export type NavigationProp = NativeStackNavigationProp<ScreenParamList>;

export interface ApiResponse<T = unknown> {
  status: boolean;
  message: string;
  data: T;
}
