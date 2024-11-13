import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Link, router, Redirect } from "expo-router";
import { ano, pagamentos, useCTDatabase } from "@/database/useCTDatabase";
import { useEffect, useState } from "react";
import styles from "@/styles";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { idInstrutor } from "..";
import { eAdmin } from "..";

import { Anos } from "@/components/Anos";

export default function Index(){
    const CTDatabase = useCTDatabase()

    const [eAdmin2, setEAdmin2] = useState(eAdmin)

    //const [eAdmin, setEAdmin] = useState<{eAdmin: string}>()
    
    /* async function verificarAdmin(){
        try {
            const result = await CTDatabase.eAdmin(idInstrutor)

            if(result){
                setEAdmin(result)
            }
        } catch (error) {
            console.log(error)
        }
    }  */


    if(eAdmin2 == undefined){
        Alert.alert("Precisa ser Administrador!")
        return <Redirect href={'/Instrutor'}/>
    }

    const [anos, setAnos] = useState<pagamentos[]>([])

    function atualizar(){
        listarAnos()
    }

    async function listarAnos(){
        const response = await CTDatabase.listarAnos()
        setAnos(response)
    }

    useEffect(()=> {
        listarAnos()
    },[])

    return(
        <View style={{alignItems:'center', justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => router.navigate('/Instrutor/(tabs)/pagamentos/addpagamentos')}>
                    <MaterialIcons name='add' size={32} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:5, marginLeft:10}}onPress={atualizar}>
                    <Feather name="refresh-cw" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <FlatList 
                    data={anos}
                    keyExtractor={(item, index)=> String(index)}
                    renderItem={({ item }) => 
                    <Anos
                        data={(item)}
                        onPress={() => router.navigate('/Instrutor/(tabs)/pagamentos/'+ item.ano)}
                    />}
                />
        </View>
    )
}