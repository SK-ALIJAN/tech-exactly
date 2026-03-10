import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import { StackNavigation } from './StackNavigation';
import { store } from '../store';
import { navigationRef } from '../../App';

export const NavigationContainers = (): React.JSX.Element => {
    return (
        <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
                <StackNavigation />
            </NavigationContainer>
        </Provider>
    );
};
