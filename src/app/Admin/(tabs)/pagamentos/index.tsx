import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { ano, pagamentos, useCTDatabase } from "@/database/useCTDatabase";
import { useEffect, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";

import { Feather } from "@expo/vector-icons";

import { Anos } from "@/components/Anos";

export default function Index(){
    const [anos, setAnos] = useState<pagamentos[]>([])
    const CTDatabase = useCTDatabase()

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
                <TouchableOpacity onPress={() => router.navigate('/Admin/(tabs)/pagamentos/addpagamentos')}>
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
                        onPress={() => router.navigate('/Admin/(tabs)/pagamentos/'+ item.ano)}
                    />}
                />
        </View>
    )
}