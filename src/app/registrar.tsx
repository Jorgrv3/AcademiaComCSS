import { View, Text, TextInput, Pressable, Alert} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';

import { useCTDatabase, alunos, usuarios } from "@/database/useCTDatabase";

import styles from "@/styles";

export default function Login(){

    const CTDatabase = useCTDatabase();

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [error, setError] = useState(false)

    async function registrar(){
        if(email != '' && senha != ''){
                setError(false)
            try {
                const response = await CTDatabase.temEmail({email})

                if(response){
                    setError(true)
                    return(console.log('Email já cadastrado!'))
                }
            } catch (error) {
                console.log(error)
            }
            try {
                const response = await CTDatabase.registrar({email, senha})

                Alert.alert("Usuário cadastrado com o ID: " + response.insertedRowId)
                setEmail('')
                setSenha('')
            } catch (error) {
                console.log("Erro no cadastro: ",error)
            }
        }else{
            Alert.alert("Campos em branco.")
        }
    }


    return(
        <View style={[styles.container, {flex:1}]}>
            <View style={styles.smallView}>
                <View style={{flexDirection:'row'}}>
                    <Ionicons style={{marginTop:15}} name="person-circle" size={24} color="black" />
                    <TextInput 
                        style={styles.inputLogin}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="  E-mail"
                    />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Foundation style={{marginTop:15, marginRight:4, marginLeft:3}} name="unlock" size={24} color="black" />
                    <TextInput 
                        style={styles.inputLogin} 
                        onChangeText={setSenha}
                        value={senha}
                        placeholder="  Senha"
                    />
                </View>
                {error?<Text style={{marginHorizontal:15, color:'red'}}>E-mail já cadastrado!</Text>:null}
                <Pressable onPress={registrar}>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <Text style={styles.botaoLogin}>Registrar-se</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}