import { Text } from 'react-native';
import { TouchableOpacity, View } from "react-native";
import { GameController } from "phosphor-react-native";

import { DuoInfo } from "../DuoInfo";

import { styles } from "./styles";
import { THEME } from "../../theme";

export interface DuoCardProps {
  hourEnd: string;
  hourStart: string;
  id: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: String[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnected: () => void;
}

export function DuoCard({ data, onConnected }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />

      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />

      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnected}>
        <GameController color={THEME.COLORS.TEXT} size={20} />

        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
