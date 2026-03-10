import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenParamList, Screens } from '../types';
import { Auth, Home } from '../view/screens';
import Myleague from '../view/screens/Home/Myleague/Myleague';
import Leagues from '../view/screens/Home/Leagues/Leagues';
import ScoreLogs from '../view/screens/Home/ScoreLog/ScoreLogs';
import TabNavigation from './TabNavigation';
import SubmitScore from '../view/screens/ScoreSections/SubmitScore/SubmitScore';
import LeagueDetails from '../view/screens/Leagues/LeagueDetail/LeagueDetails';
import Profile from '../view/screens/Profile/Profile';
import CreateLeague from '../view/screens/Leagues/CreateLeague/CreateLeague';
import LeagueSchedule from '../view/screens/LeagueSchedule/LeagueSchedule';
import CreateLeagues from '../view/screens/Home/CreateLeagues/CreateLeagues';
import CreateTournament from '../view/screens/Tournaments/CreateTournament/CreateTournament';

const Stack = createNativeStackNavigator<ScreenParamList>();

export const StackNavigation = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.Splash}
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name={Screens.Splash} component={Auth.Splash} />
      <Stack.Screen name={Screens.SignIn} component={Auth.SignIn} />
      <Stack.Screen name={Screens.SignUp} component={Auth.SignUp} />
      <Stack.Screen
        name={Screens.ForgotPassword}
        component={Auth.ForgotPassword}
      />
      <Stack.Screen name={Screens.Verification} component={Auth.Verification} />
      <Stack.Screen name={Screens.Onboarding} component={Auth.Onboarding} />
      <Stack.Screen
        name={Screens.ResetPassword}
        component={Auth.ResetPassword}
      />
      <Stack.Screen
        name={Screens.OnBoardingFirstScreen}
        component={Auth.OnBoardingFirstScreen}
      />
      <Stack.Screen
        name={Screens.OnBoardingSecondScreen}
        component={Auth.OnBoardingSecondScreen}
      />
      <Stack.Screen name={Screens.Home} component={Home.Home} />
      {/* --------------------Tab Navigation--------------------------- */}
      <Stack.Screen name={Screens.TabScreen} component={TabNavigation} />
      <Stack.Screen name={Screens.Myleague} component={Myleague} />
      <Stack.Screen name={Screens.Leagues} component={Leagues} />
      <Stack.Screen name={Screens.ScoreLogs} component={ScoreLogs} />
      <Stack.Screen name={Screens.Settings} component={Home.Settings} />
      <Stack.Screen name={Screens.SubmitScore} component={SubmitScore} />

      {/* -----------------Detail Screens------------------------- */}
      <Stack.Screen name={Screens.LeagueDetail} component={LeagueDetails} />

      {/* -----------------Detail Screens------------------------- */}
      <Stack.Screen name={Screens.CreateLeague} component={CreateLeague} />
      <Stack.Screen name={Screens.CreateTournament} component={CreateTournament} />
      <Stack.Screen name={Screens.CreateLeagueList} component={CreateLeagues} />
      {/* ----------------- Profile Screen ----------------------- */}
      <Stack.Screen name={Screens.Profile} component={Profile} />
      {/* ----------------- Terms and Condition Screen ----------------------- */}
      <Stack.Screen name={Screens.TermsCondition} component={Home.TermsCondition} />
      <Stack.Screen name={Screens.PrivacyPolicy} component={Home.PrivacyPolicy} />

      {/* ----------------- Player score Screens ----------------------- */}
      <Stack.Screen
        name={Screens.PlayerPendingScore}
        component={Home.PlayerPendingScore}
      />

      <Stack.Screen name={Screens.PlayerAllScore} component={Home.PlayerAllScore} />
      <Stack.Screen name={Screens.PlayerResultScore} component={Home.PlayerResultScore} />
      <Stack.Screen name={Screens.OrganiserPendingScore} component={Home.OrganiserPendingScore} />

      <Stack.Screen name={Screens.ChangePassword} component={Home.ChangePassword} />
      {/* -----------------Notification Screen ----------------------- */}
      <Stack.Screen name={Screens.Notification} component={Home.Notification} />
      <Stack.Screen name={Screens.LeagueSchedule} component={LeagueSchedule} />
    </Stack.Navigator>
  );
};
