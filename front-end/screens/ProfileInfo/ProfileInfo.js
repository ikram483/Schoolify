import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfileInfo({ navigation, user, userId, image: initialImage }) {
  const [image, setImage] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: user || 'User Name',
    email: 'user@example.com',
    phone: '+1 234 567 890',
    location: 'Paris, France'
  });
  const [editedInfo, setEditedInfo] = useState({
    fullName: user || 'User Name',
    email: 'user@example.com',
    phone: '+1 234 567 890',
    location: 'Paris, France'
  });

  const pickImage = async () => {
    try {
      setIsLoading(true);
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Please allow access to the photo library');
        setIsLoading(false);
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        
        const endpointUrl = `https://todoapp-react-native.mohamedkacem1.repl.co/tasks/users/${userId}/photo`; 
        const formData = new FormData();
        formData.append('photo', {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
        
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        
        try {
          const response = await axios.patch(endpointUrl, formData, config);
          console.log('Image uploaded:', response.data);
          Alert.alert('Success', 'Profile photo updated successfully');
        } catch (error) {
          console.error('Upload Error:', error);
          Alert.alert('Upload Failed', 'Could not upload the image');
        }
      }
      
    } catch (error) {
      console.error('ImagePicker Error:', error);
      Alert.alert('Error', 'Could not pick an image');
    } finally {
      setIsLoading(false);
    }
  };
  
  const logOut = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => navigation.navigate('Login')
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.logout} onPress={logOut}>
          <MaterialIcons name="logout" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.profile}>
          <View style={styles.imageContainer}>
            {image ? (
              <Image 
                source={{ uri: image }} 
                style={styles.img} 
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <FontAwesome name="user" size={50} color="#192f6a" />
              </View>
            )}
            <TouchableOpacity style={styles.edit} onPress={pickImage} disabled={isLoading}>
              {isLoading ? 
                <AntDesign name="loading1" size={20} color="#192f6a" /> : 
                <Entypo name="camera" size={20} color="#192f6a" />
              }
            </TouchableOpacity>
          </View>
          
          <Text style={styles.fullName}>{userInfo.fullName}</Text>
        </View>
      </LinearGradient>
      
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="email" size={22} color="#3b5998" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userInfo.email}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <FontAwesome name="phone" size={22} color="#3b5998" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{userInfo.phone}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Entypo name="location-pin" size={22} color="#3b5998" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{userInfo.location}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="edit" size={22} color="#3b5998" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="security" size={22} color="#3b5998" />
            <Text style={styles.actionText}>Privacy & Security</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="help-outline" size={22} color="#3b5998" />
            <Text style={styles.actionText}>Help & Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  img: {
    borderRadius: 50,
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  placeholderImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  logout: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  edit: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 8,
    shadowColor: '#003049',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    elevation: 4,
  },
  infoSection: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
  actionsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});