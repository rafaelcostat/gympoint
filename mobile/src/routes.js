import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from '~/pages/SignIn';

export default (signedIn = false) =>
  createAppContainer(createSwitchNavigator({ SignIn }));
