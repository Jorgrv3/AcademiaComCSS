import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { ano, pagamentos, useCTDatabase } from "@/database/useCTDatabase";
import { useEffect, useState } from "react";

import { idAluno } from "..";

import { Feather } from "@expo/vector-icons";

import { Anos } from "@/components/Anos";

import styles from "@/styles";

export default function Index(){
    const [anos, setAnos] = useState<pagamentos[]>([])
    const CTDatabase = useCTDatabase()

    function atualizar(){
        listarAnos()
    }

    async function listarAnos(){
        try {
            const response = await CTDatabase.listarAnosDoAluno(idAluno)
            setAnos(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        listarAnos()
    },[])

    return(
        <View style={{alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity style={{marginTop:5}} onPress={atualizar}>
                    <Feather name="refresh-cw" size={24} color="black" />
                </TouchableOpacity>
            <FlatList 
                    data={anos}
                    keyExtractor={(item, index)=> String(index)}
                    renderItem={({ item }) => 
                    <Anos
                        data={(item)}
                        onPress={() => router.navigate('/Aluno/(tabs)/pagamentos/'+ item.ano)}
                    />}
                />
        </View>
    )
}

const stylesHome = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#e8e8e8'
    },
    smallView:{
        borderColor:'#CECECE',
        backgroundColor:'white',
        borderWidth:1,
        padding:50,
        borderRadius:5
    }
})