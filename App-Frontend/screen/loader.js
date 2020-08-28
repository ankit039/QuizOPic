import React, { Component,useContext } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
import ThemeContext from "../context/theme";

export default function Loader (props){

  const { theme } = useContext(ThemeContext);

  const {
    loading,
    ...attributes
  } = props;

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    activityIndicatorWrapper: {
      zIndex: -1,
      backgroundColor: '#FFFFFF',
      color: "grey",
      height: 50,
      width: 50,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading} />
        </View>
      </View>
    </Modal>
  )
}
