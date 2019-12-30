import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import CheckIn from '~/pages/CheckIn';
import HelpOrders from '~/pages/HelpOrders/Index';
import HelpOrderNew from '~/pages/HelpOrders/New';
import HelpOrderShow from '~/pages/HelpOrders/Show';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator(
          {
            CheckIn: {
              screen: CheckIn,
              navigationOptions: {
                tabBarLabel: 'Check-ins',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="edit-location" size={20} color={tintColor} />
                ),
              },
            },
            HelpOrders: {
              screen: createStackNavigator(
                {
                  HelpOrders,
                  HelpOrderShow,
                  HelpOrderNew,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerBackImage: () => (
                      <Icon name="chevron-left" size={24} color="#000" />
                    ),
                    headerLeftContainerStyle: {
                      marginBottom: 8,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999999',
              labelStyle: {
                fontSize: 14,
                marginTop: -10,
                marginBottom: 10,
              },
              style: {
                backgroundColor: '#fff',
                borderTopColor: '#dddddd',
                height: 65,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignIn',
      }
    )
  );
