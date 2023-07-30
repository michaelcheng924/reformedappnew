import { ReactNode, useContext } from "react";
import { Text } from "react-native-elements";
import { SettingsContext } from "../contexts/SettingsContext";

interface Props {
  color?: string;
  forceColor?: boolean;
  bold?: boolean;
  children?: ReactNode;
  style?: Record<string, unknown>;
  isHeading?: boolean;
  isSmall?: boolean;
}

export default function AppText({
  color,
  forceColor,
  bold,
  children,
  style,
  isHeading,
  isSmall,
}: Props) {
  const { theme, size, font } = useContext(SettingsContext);

  const finalSize = isHeading ? size + 3 : isSmall ? size - 4 : size;

  return (
    <Text
      style={{
        color:
          (color
            ? theme === "Dark" && !forceColor
              ? "#b3e5fc"
              : color
            : color) || (theme === "Dark" ? "#fff" : "#4d5156"),
        fontSize: finalSize || 16,
        lineHeight: finalSize + finalSize / 2,
        fontWeight: bold ? "bold" : "normal",
        ...style,
      }}
    >
      {children}
    </Text>
  );
}
