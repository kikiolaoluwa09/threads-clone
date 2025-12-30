import { ScrollView, Text } from "react-native";
import {useHeaderHeight} from '@react-navigation/elements'

export default function Search(){
    const headerHeight = useHeaderHeight()
    return(
        <ScrollView style={{paddingTop: headerHeight}}
            keyboardDismissMode="on-drag"
        >
            <Text className="text-white">Search</Text>
        </ScrollView>
    )
}