import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { auth, database } from "@/firebase"
import { useRootNavigationState, Redirect } from 'expo-router';
import { Button, Dimensions, Text, View, Platform, FlatList } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

import { Post } from "@/types/post"

export const Test = memo(() => {
  const [loading, setLoading] = useState<boolean>(false)
  const [suggestionsList, setSuggestionsList] = useState<Array<Post> | null>(null)
  const [selectedItem, setSelectedItem] = useState<Post | null>(null)
  const dropdownController = useRef(null)

  const searchRef = useRef(null)

  const getSuggestions = useCallback(async (q: string) => {

    const filterToken = q.toLowerCase()

    console.log('getSuggestions', q)
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null)
      return
    }
    setLoading(true)

    const postListRef = ref(database, 'posts');
    onValue(postListRef, (snapshot) => {
      const data = snapshot.val();
      const suggestions = data
        .filter((item: Post) => item.title.toLowerCase().includes(filterToken))
        .map((item: Post) => ({
          id: item.id,
          title: item.title,
        }))

      setSuggestionsList(suggestions)
    });

    setLoading(false)
  }, [])

  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
  }, [])

  const onOpenSuggestionsList = useCallback(isOpened => { }, [])

  return (
    <>
      <View
        style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center' },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}>
        <AutocompleteDropdown
          ref={searchRef}

          controller={controller => {
            dropdownController.current = controller
          }}

          direction={Platform.select({ ios: 'down' })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}

          onSelectItem={item => {
            item && setSelectedItem(item.id)
          }}

          debounce={600}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          onClear={onClearPress}
          //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false} // set false to prevent rerender twice
          textInputProps={{
            placeholder: 'Type 3+ letters (dolo...)',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              backgroundColor: '#383b42',
              color: '#fff',
              paddingLeft: 18,
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,

            alignSelf: 'center',
          }}
          inputContainerStyle={{
            backgroundColor: '#383b42',
            borderRadius: 25,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: '#383b42',
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => <Text style={{ color: '#fff', padding: 15 }}>{item.title}</Text>}
          //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
          //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
        //  showClear={false}
        />
        <View style={{ width: 10 }} />
        <Button style={{ flexGrow: 0 }} title="Toggle" onPress={() => dropdownController.current.toggle()} />
      </View>
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item id: {JSON.stringify(selectedItem)}</Text>
    </>
  )
})

const Explore: React.FC = () => {
  const user = auth.currentUser;

  if (user === null) {
    const rootNavigationState = useRootNavigationState();
    if (!rootNavigationState?.key) return null;
    return <Redirect href={'/'} />
  }

  return (
    <View>
      <Test />
      <Text>
        "hello"
      </Text>
    </View>
  );
};

export default Explore;
