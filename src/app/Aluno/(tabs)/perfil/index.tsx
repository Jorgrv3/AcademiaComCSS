import { useCTDatabase } from "@/database/useCTDatabase";
import { idAluno } from "..";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import styles from "@/styles";

export default function Perfil(){
    const CTDatabase = useCTDatabase()

    const [infos, setInfos] = useState({
        nome: '',
        nascimento: '',
        telefone: ''
    })

    async function PegarInfos(){
        const result = await CTDatabase.pegarInfosPerfilAluno(idAluno)
        if(result){
            setInfos({
                nome: result.nome,
                nascimento: result.nascimento,
                telefone: result.telefone
            })
        }
    }

    useEffect(()=> {
        PegarInfos()
    },[])

    return(
        <View style={styles.perfilStyle}>
            <View style={styles.smallViewPerfil}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.bold}>Nome: </Text>
                    <Text>{infos.nome}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.bold}>Nascimento: </Text>
                    <Text>{infos.nascimento}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.bold}>Telefone: </Text>
                    <Text>{infos.telefone}</Text>
                </View>
            </View>
        </View>
    )
}