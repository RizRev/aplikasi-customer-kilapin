import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Home, Task, TaskOn, News, NewsOn, Chat, ChatOn, Profile, ProfileOn } from '../../../assets'
import {LinearGradient} from 'expo-linear-gradient';

const Icon = ({label, focus}) => {
  switch(label){
    case 'NewsBL':
      return focus ? <View style={{backgroundColor: '#fff', paddingTop: '25%', paddingBottom: '25%', paddingLeft: '5%', paddingRight: '5%', justifyContent: 'center', alignItems: 'center'}}><NewsOn /></View> : <View style={{backgroundColor: '#fff', paddingTop: '25%', paddingBottom: '25%', paddingLeft: '5%', paddingRight: '5%', justifyContent: 'center', alignItems: 'center'}}><News/></View>
    case 'ProfileBL':
      return focus ? <View style={{backgroundColor: '#fff', paddingTop: '25%', paddingBottom: '25%', paddingLeft: '5%', paddingRight: '5%', justifyContent: 'center', alignItems: 'center'}}><ProfileOn /></View> : <View style={{backgroundColor: '#fff', paddingTop: '25%', paddingBottom: '25%', paddingLeft: '5%', paddingRight: '5%', justifyContent: 'center', alignItems: 'center'}}><Profile/></View>
    case 'TaskBL':
      return focus ? <View style={{backgroundColor: '#fff', paddingTop: '25%', paddingBottom: '25%', paddingLeft: '5%', paddingRight: '5%', justifyContent: 'center', alignItems: 'center', marginRight: '5%'}}><TaskOn /></View> : <View style={{marginRight: '5%', backgroundColor: '#fff', paddingTop: '25%', paddingBottom: '25%', paddingLeft: '5%', paddingRight: '5%', justifyContent: 'center', alignItems: 'center'}}><Task/></View>
    case 'ChatBL':
      return focus ? <View style={{backgroundColor: '#fff', paddingTop: '25%', paddingBottom: '25%', paddingLeft: '5%', paddingRight: '5%', justifyContent: 'center', alignItems: 'center', marginLeft: '5%'}}><ChatOn /></View> : <View style={{backgroundColor: '#fff', paddingTop: '25%', paddingBottom: '25%', paddingLeft: '5%', paddingRight: '5%', justifyContent: 'center', alignItems: 'center', marginLeft: '5%'}}><Chat /></View>
    default:
      return <LinearGradient colors={['#5865F2', '#DD7DE1' ]} style={styles.homebackground} > 
      <Home/> 
      </LinearGradient>
  }
}


const BottomNavigatorBL = ({ state, descriptors, navigation }) => {
  return (
    <View>
      <LinearGradient colors={['#5865F2', '#DD7DE1' ]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.viewpad}></LinearGradient>
    <View style={{ flexDirection: 'row', backgroundColor: '#fff', paddingLeft:30, paddingRight:30, paddingBottom: 13, paddingTop: 13, justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
  
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{backgroundColor: "#fff"}}
          >
            <Icon label={label} focus={isFocused}/>
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homebackground: {
    backgroundColor: '#5865F2',
    padding: 10,
    borderRadius: 200,
  },
  viewpad: {
    padding: 2
  },
})

export default BottomNavigatorBL