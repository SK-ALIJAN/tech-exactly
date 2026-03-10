// -----------------------SCREENS----------Type Define Here---------------------
export enum Screens {
  // -----------------Auth Screens--------------
  Splash = 'Splash',
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  Home = 'Home',
  ForgotPassword = 'ForgotPassword',
  Verification = 'Verification',
  Onboarding = 'Onboarding',
  ResetPassword = 'ResetPassword',
  OnBoardingFirstScreen = 'OnBoardingFirstScreen',
  OnBoardingSecondScreen = 'OnBoardingSecondScreen',
  // ---------Tab Screens----------
  TabScreen = 'TabScreen',
  Myleague = 'Myleague',
  Leagues = 'Leagues',
  ScoreLogs = 'ScoreLogs',
  Settings = 'Settings',
  // ---------ScoreSections---------
  SubmitScore = 'SubmitScore',
  // ------------Profile-----------
  Profile = 'Profile',

  // ---------------TermsANd Condition------------
  TermsCondition = 'TermsCondition',
  PrivacyPolicy = 'PrivacyPolicy',


  // -----------Change PAssword----------
  ChangePassword = 'ChangePassword',
  // ------------Notification-----------
  Notification = 'Notification',

  // ---------------Player Score module------------
  PlayerPendingScore = 'PlayerPendingScore',
  PlayerAllScore = 'PlayerAllScore',
  PlayerResultScore = 'PlayerResultScore',
  OrganiserPendingScore = 'OrganiserPendingScore',

  // --------Details Screens----------
  LeagueDetail = 'LeagueDetail',


  // ----------Create League------------
  CreateLeague = 'CreateLeague',
  CreateTournament = "CreateTournament",
  CreateLeagueList = 'CreateLeagueList',

  // ----------League schedule------------
  LeagueSchedule = 'LeagueSchedule'
}

export type ScreenParamList = {
  [Screens.Splash]: undefined;
  [Screens.SignIn]: undefined;
  [Screens.SignUp]: undefined;
  [Screens.Home]: undefined;
  [Screens.ForgotPassword]: undefined;
  [Screens.Verification]: { email: string };
  [Screens.Onboarding]: undefined;
  [Screens.ResetPassword]: undefined;
  [Screens.OnBoardingFirstScreen]: undefined;
  [Screens.OnBoardingSecondScreen]: undefined;
  // ------------------Tab Screens----------
  [Screens.TabScreen]: undefined;
  [Screens.Myleague]: undefined;
  [Screens.Leagues]: undefined;
  [Screens.ScoreLogs]: undefined;
  [Screens.Settings]: undefined;
  // ------------------ScoreSections----------
  [Screens.SubmitScore]: { league_id: number, team_no: number, schedule_id: number };
  // ------------Profile-----------
  [Screens.Profile]: undefined;
  // -------------TermsANd Condition------------
  [Screens.TermsCondition]: undefined,
  [Screens.PrivacyPolicy]: undefined,
  // --------Details Screens----------
  [Screens.LeagueDetail]: { leagueId: number };
  // --------Player Score Screens----------
  [Screens.PlayerPendingScore]: { scheduleId: number, isOrganiser: boolean };
  [Screens.PlayerResultScore]: undefined;
  [Screens.OrganiserPendingScore]: undefined;

  [Screens.PlayerAllScore]: undefined;
  // -----------Change PAssword----------
  [Screens.ChangePassword]: undefined,
  // ------------Notification-----------
  [Screens.Notification]: undefined,

  // --------Orginiser Score Screens----------
  [Screens.CreateLeague]: undefined,
  [Screens.CreateTournament]: undefined,
  [Screens.CreateLeagueList]: undefined,
  [Screens.LeagueSchedule]: { scheduleId: number, isOrganiser: boolean }
};

// for inner navigation screens define here
export enum InnerNavScreens {
  Dashboard = 'Dashboard',
  Reservations = 'Reservations',
  ReservationList = 'ReservationList',
  ReservationDetails = 'ReservationDetails',
  Orders = 'Orders',
  OrderList = 'OrderList',
  OrderDetails = 'OrderDetails',
  Tips = 'Tips',
  TipList = 'TipList',
  TipDetails = 'TipDetails',
  Settings = 'Settings',
  Notification = 'Notification',
  PrivacyPolicy = 'PrivacyPolicy',
  TermsConditions = 'TermsConditions',
  ChangePassword = 'ChangePassword',
  Logout = 'Logout',
  MyProfile = 'MyProfile',
}

// Innetr navigation screens
export enum InnerNavPaths {
  Dashboard = InnerNavScreens.Dashboard,
  Reservations = InnerNavScreens.Reservations,
  ReservationList = InnerNavScreens.ReservationList,
  ReservationDetails = InnerNavScreens.ReservationDetails,
  Orders = InnerNavScreens.Orders,
  OrderList = InnerNavScreens.OrderList,
  OrderDetails = InnerNavScreens.OrderDetails,
  Tips = InnerNavScreens.Tips,
  TipList = InnerNavScreens.TipList,
  TipDetails = InnerNavScreens.TipDetails,
  TermsConditions = InnerNavScreens.TermsConditions,
  PrivacyPolicy = InnerNavScreens.PrivacyPolicy,
  ChangePassword = InnerNavScreens.ChangePassword,
  Notification = InnerNavScreens.Notification,
  MyProfile = InnerNavScreens.MyProfile,
  Settings = InnerNavScreens.Settings,
}

// for inner navigation types
export type InnerNavTypes =
  | 'Dashboard'
  | 'Reservations'
  | 'ReservationList'
  | 'ReservationDetails'
  | 'Orders'
  | 'OrderList'
  | 'OrderDetails'
  | 'Tips'
  | 'TipList'
  | 'TipDetails'
  | 'Settings'
  | 'Notification'
  | 'PrivacyPolicy'
  | 'TermsConditions'
  | 'ChangePassword'
  | 'MyProfile'
  | 'Logout';
