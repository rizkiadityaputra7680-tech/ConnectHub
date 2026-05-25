import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { storyAPI } from '../services/api';

const StoriesScreen = ({ navigation }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      setLoading(true);
      // Mock data
      setStories([
        {
          id: '1',
          author: 'John Doe',
          authorImage: 'https://via.placeholder.com/50',
          mediaUrl: 'https://via.placeholder.com/300x400',
          caption: 'Beautiful day! ☀️',
          views: 125,
          createdAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error loading stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStory = ({ item }) => (
    <TouchableOpacity
      style={styles.storyContainer}
      onPress={() =>
        navigation.navigate('StoryView', {
          storyId: item.id,
          author: item.author,
        })
      }
    >
      <Image source={{ uri: item.mediaUrl }} style={styles.storyImage} />
      <View style={styles.storyOverlay}>
        <Image source={{ uri: item.authorImage }} style={styles.authorImage} />
        <Text style={styles.authorName}>{item.author}</Text>
        <View style={styles.viewBadge}>
          <Text style={styles.viewText}>{item.views} 👁️</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stories</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateStory')}
        >
          <Text style={styles.addButtonText}>+ Add Story</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#128C7E" style={styles.loader} />
      ) : stories.length > 0 ? (
        <FlatList
          data={stories}
          renderItem={renderStory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={true}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No stories yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#128C7E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#DCF8C6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#128C7E',
    fontWeight: 'bold',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  storyContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    height: 300,
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  storyOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
  },
  authorName: {
    color: '#fff',
    fontWeight: 'bold',
  },
  viewBadge: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 5,
  },
  viewText: {
    color: '#fff',
    fontSize: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default StoriesScreen;
