import { Button, Icon, Text } from "@rneui/themed";
import { blue } from "../constants/colors";

export default function AllChapters({ setShowChapters, text }) {
  return (
    <Button
      type="clear"
      onPress={() => {
        setShowChapters(true);
      }}
    >
      <Icon name="list" color={blue} size={34} />
      <Text
        h4
        h4Style={{
          color: blue,
        }}
      >
        {text}
      </Text>
    </Button>
  );
}
