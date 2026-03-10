import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Animated,
  Pressable,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBgComponent from '../assets/iconsComponents/TabBgComponent';
import { Screens } from '../types';
import ActiveHomeTabIcon from '../assets/iconsComponents/ActiveHomeTabIcon';
import ActiveLeagueTabIcon from '../assets/iconsComponents/ActiveLeagueTabIcon';
import AddHomeTabIcon from '../assets/iconsComponents/AddHomeTabIcon';
import ActiveScoreTabIcon from '../assets/iconsComponents/ActiveScoreTabIcon';
import { useColor } from '../model';
import { Home, Leagues, Myleague, Settings } from '../view/screens/Home';
import ScoreLogs from '../view/screens/Home/ScoreLog/ScoreLogs';
import { FontFamily } from '../assets/fonts';
import ActiveSettingsTabIcon from '../assets/iconsComponents/ActiveSettingsTabIcon';
import CreateLeague from '../view/screens/Leagues/CreateLeague/CreateLeague';
// import PlayerPendingScore from '../view/screens/ScoreSections/PlayerPendingScore.tsx/PlayerPendingScore';

const Bottom = createBottomTabNavigator();
const { width } = Dimensions.get('window');
console.log('ds', width);


const TAB_BAR_HEIGHT = 111;
const FLOATING_BUTTON_SIZE = 80;
// const FLOATING_BUTTON_TOP_OFFSET = -45;

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const color = useColor();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const currentRoute = state.routes[state.index];
  const isLeaguesFocused = currentRoute.name === Screens.Leagues;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 6,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  const closeMenu = () => {
    Animated.spring(animation, {
      toValue: 0,
      friction: 6,
      useNativeDriver: true,
    }).start();
    setOpen(false);
  };

  return (
    <>
      <View style={[styles.tabBarContainer, { height: TAB_BAR_HEIGHT + bottom }]}>
        <View style={styles.svgContainer}>
          <TabBgComponent
            width={width + 5}
            height={TAB_BAR_HEIGHT + bottom}
            fillColor="#2F5A62"
          />
        </View>

        <View
          style={[
            styles.floatingButtonContainer,
            {
              left: (width - FLOATING_BUTTON_SIZE) / 2,
              bottom: insets.bottom + 22.5,

            },
          ]}
        >

          {/* OPTION 1 */}
          <Animated.View
            pointerEvents={open ? 'auto' : 'none'}
            style={{
              position: 'absolute',
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -90],
                  }),
                },
                { scale: animation },
              ],
              opacity: animation,
            }}
          >
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => {
                toggleMenu();
                setTimeout(() => {
                  navigation.navigate(Screens.CreateTournament);
                }, 200);
              }}
            >
              <Text style={styles.popupText}>Create Tournament</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* OPTION 2 */}
          <Animated.View
            pointerEvents={open ? 'auto' : 'none'}
            style={{
              position: 'absolute',
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -160],
                  }),
                },
                { scale: animation },
              ],
              opacity: animation,
            }}
          >
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => {
                toggleMenu();
                setTimeout(() => {
                  navigation.navigate(Screens.CreateLeague);
                }, 200);

              }}
            >
              <Text style={styles.popupText}>Create League</Text>
            </TouchableOpacity>
          </Animated.View>


          {/* MAIN FAB (UNCHANGED DESIGN) */}
          <TouchableOpacity
            style={[
              styles.floatingButton,
              {
                width: FLOATING_BUTTON_SIZE,
                height: FLOATING_BUTTON_SIZE,
                borderRadius: FLOATING_BUTTON_SIZE / 2,
              },
            ]}
            onPress={toggleMenu}
            activeOpacity={0.8}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '45deg'],
                    }),
                  },
                ],
              }}
            >
              <AddHomeTabIcon width={26} height={26} fillColor="black" />
            </Animated.View>
          </TouchableOpacity>

          <Text
            style={[
              styles.floatingButtonLabel,
              { color: open ? '#15AE99' : '#FFFFFF' },
            ]}
          >
            {t('Create')}
          </Text>
        </View>


        {/* Tab Items */}
        <View style={[styles.tabBarContent, { width: width, paddingBottom: bottom }]}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel;
            const isFocused = state.index === index;

            if (route.name === Screens.Leagues) {
              return <View key={route.key} style={styles.tabItem} />;
            }

            const icons: any = {
              [Screens.Home]: isFocused ? (
                <ActiveHomeTabIcon
                  fill="#15AE99"
                  stroke="#15AE99"
                  strokeWidth={1}
                />
              ) : (
                <ActiveHomeTabIcon
                  stroke="#ffff"
                  strokeWidth={0.2}
                  fill="#ffff"
                />
              ),
              [Screens.Myleague]: isFocused ? (
                <ActiveLeagueTabIcon
                  fill="#15AE99"
                  stroke="#15AE99"
                  strokeWidth={0.5}
                />
              ) : (
                <ActiveLeagueTabIcon
                  stroke="white"
                  fill="transparent"
                  strokeWidth={1.4}
                />
              ),
              [Screens.ScoreLogs]: isFocused ? (
                <ActiveScoreTabIcon fill="#15AE99" stroke="#15AE99" />
              ) : (
                <ActiveScoreTabIcon stroke="white" fill="transparent" />
              ),
              [Screens.Settings]: isFocused ? (
                <ActiveSettingsTabIcon fill="#15AE99" stroke="#15AE99" />
              ) : (
                <ActiveSettingsTabIcon stroke="white" fill="transparent" />
              ),
            };

            const source = icons[route.name];


            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabItem}
              >
                {source}
                <Text
                  style={[
                    styles.label,
                    {
                      color: isFocused && route.name !== Screens.Leagues ? '#15AE99' : '#FFFFFF',
                      fontFamily: FontFamily.MANROPE.SEMI_BOLD,
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  svgContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
  },
  floatingButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    gap: 25
  },
  floatingButton: {
    backgroundColor: '#00E8A0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FontFamily.ROBOTO_SLAB.SEMI_BOLD,
  },
  tabBarContent: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_BAR_HEIGHT,
    paddingTop: 40,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  popupButton: {
    minWidth: 180,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#00E8A0",
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  popupText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },

});

const TabNavigation = () => {
  const { t } = useTranslation();

  return (
    <Bottom.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
      }}
    >
      <Bottom.Screen
        name={Screens.Home}
        component={Home}
        options={{ tabBarLabel: t('Home') }}
      />
      <Bottom.Screen
        name={Screens.Myleague}
        component={Myleague}
        options={{ tabBarLabel: t('My Games') }}
      />
      <Bottom.Screen
        name={Screens.Leagues}
        component={Leagues}
      />
      <Bottom.Screen
        name={Screens.ScoreLogs}
        component={ScoreLogs}
        // component={PlayerPendingScore}
        options={{ tabBarLabel: t('Score Log') }}
      />
      <Bottom.Screen
        name={Screens.Settings}
        component={Settings}
        options={{ tabBarLabel: t('Settings') }}
      />
    </Bottom.Navigator>
  );
};

export default TabNavigation;





