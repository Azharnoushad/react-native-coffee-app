import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {useSelector} from 'react-redux';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CoustomIcon from '../components/CoustomIcon';
import CoffeeCard from '../components/CoffeeCard';

const HomeScreen = () => {
  const state = useSelector((state: any) => state.coffee);

  const myCategoryData = (data: any) => {
    let categoriesFromData = data.map((coffee: any) => coffee.name);

    let categories = [...new Set(categoriesFromData)];
    categories.unshift('All');
    return categories;
  };
  // useState functions----------------------------------------------------------------

  const [myCategories, setMyCategories] = useState(
    myCategoryData(state.coffeeList),
  );
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [myCoffeeList, setMyCoffeeList] = useState(state.coffeeList);

  // useState functions----------------------------------------------------------------

  const categorySelectHandler = (_category: string) => {
    let categoryIndexItem = myCategories.findIndex(item => item === _category);
    setCategoryIndex(categoryIndexItem);
    if (_category === 'All') {
      return setMyCoffeeList(state.coffeeList);
    } else {
      let myData = state.coffeeList.filter(
        (data: any) => data.name === _category,
      );
      return setMyCoffeeList(myData);
    }
  };

  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        {/* App Header */}
        <HeaderBar />
        <Text style={styles.screenTitle}>
          Find the best{'\n'}coffee for you
        </Text>
        {/* search Input */}

        <View style={styles.inputContainer}>
          <TouchableOpacity activeOpacity={0.8}>
            <CoustomIcon
              style={styles.inputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find Your Coffee..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer}
          />
        </View>

        {/* Category scroller */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}>
          {myCategories.map((category: any, index: any) => {
            return (
              <View key={index} style={styles.categoryViewContainer}>
                <TouchableOpacity
                  style={styles.categoryScrollViewItem}
                  activeOpacity={0.8}
                  onPress={() => categorySelectHandler(category)}>
                  <Text
                    style={[
                      styles.categoryText,
                      categoryIndex === index && {
                        color: COLORS.primaryOrangeHex,
                      },
                    ]}>
                    {category}
                  </Text>

                  {categoryIndex === index && (
                    <View style={styles.activeCategory} />
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* CoffeeList */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={myCoffeeList}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.flatListContainer]}
          renderItem={({item}) => {
            return (
              <TouchableOpacity>
                <CoffeeCard {...item} />
              </TouchableOpacity>
            );
          }}
        />
        {/* BeansList */}

        <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={state.BeansList}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.flatListContainer,{marginBottom:tabBarHeight}]}
          renderItem={({item}) => {
            return (
              <TouchableOpacity>
                <CoffeeCard {...item} />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  inputContainer: {
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  textInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  categoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  activeCategory: {
    height: SPACING.space_4,
    width: SPACING.space_4,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
  },
  categoryScrollViewItem: {
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  coffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
export default HomeScreen;
