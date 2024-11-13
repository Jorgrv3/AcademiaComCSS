import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import styles from "@/styles";
import Meses from "@/components/Meses";

export let anoAtual:string;

export default function AnoX(){
    const params = useLocalSearchParams<{ano: string}>()

    anoAtual = params.ano

    return(
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.bold}>Ano: </Text>
                <Text>{params.ano}</Text>
            </View>
            <Text style={styles.bold}>Escolha o mês</Text>
            <Meses ano={params.ano}/>
        </View>
    )
}