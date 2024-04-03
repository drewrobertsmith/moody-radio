import { Text, TouchableOpacity, View } from "react-native";

import { ScaleDecorator } from "react-native-draggable-flatlist";

export default function QueueItem({ item, drag, isActive }) {
  return (
    <ScaleDecorator>
      <TouchableOpacity onLongPress={drag} disabled={isActive}>
        <View style={{ padding: 4, margin: 2, borderWidth: 1 }}>
          <Text>{item.date}</Text>
          <Text>{item.title}</Text>
          <Text>{item.duration}</Text>
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );
}
