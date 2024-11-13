import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';

import { useCTDatabase } from "@/database/useCTDatabase";

import styles from "@/styles";



export default function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorSenha, setErrorSenha] = useState(false)


    const CTDatabase = useCTDatabase()

    async function fazerLogin(){
        setErrorEmail(false)
        setErrorSenha(false)
        try {
            const response = await CTDatabase.temEmail({email})
            
            if(response){
                const response = await CTDatabase.fazerLogin({email, senha})
                if (response){
                    const result = await CTDatabase.pegarInfosUser(email)
                    if(result?.eInstrutor == '1'){
                        router.replace('/Instrutor/(tabs)/' + String(result.id))
                        console.log("Instrutor redirecionado")
                    }else if(result?.eAluno == '1'){
                        router.replace('/Aluno/(tabs)/' + String(result?.id))
                        console.log("Aluno redirecionado!")
                    }else if(result?.eAdmin == '1'){
                        router.replace('Admin/(tabs)/' + String(result?.id))
                        console.log("Admin redirecionado!")
                    }else{
                        Alert.alert("Você não está cadastrado como instrutor, nem aluno, nem admin")
                    }
                }else{
                    setErrorSenha(true)
                    console.log('Senha incorreta!')
                }
            }else{
                setErrorEmail(true)
                return(console.log('Email não cadastrado!'))
            }
        } catch (error) {
            console.log(error)
        }
    }

    

    return(
            <View style={[styles.container,{flex:1, backgroundColor:'#FFFFFF'}]}>
                <View style={styles.smallView}>
                    <View style={{flexDirection:'row'}}>
                        <Ionicons style={{marginTop:15}} name="person-circle" size={24} color="black" />
                        <TextInput 
                            style={[styles.inputLogin]}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="  E-mail"
                        />
                        </View>
                    <View style={{flexDirection:'row'}}>
                        <Foundation style={{marginTop:15, marginRight:4, marginLeft:3}} name="unlock" size={24} color="black" />
                        <TextInput 
                            style={[styles.inputLogin,{flex:1, marginHorizontal:0}]} 
                            onChangeText={setSenha}
                            value={senha}
                            placeholder="  Senha"
                        />
                    </View>
                    {errorSenha?<Text style={[styles.camposInput,{marginHorizontal:15, color:'red'}]}>Senha incorreta!</Text>:null}
                    {errorEmail?<Text style={[styles.camposInput,{marginHorizontal:15, color:'red'}]}>E-mail não cadastrado!</Text>:null}
                   
                    <Pressable onPress={fazerLogin}>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <Text style={styles.botaoLogin}>Entrar</Text>
                        </View>
                    </Pressable>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <Link href={'/registrar'}>Registrar</Link>
                        </View>
                        <Link href={'/Admin/(tabs)/aulas'}>Admin</Link>
                </View>
            </View>
    )
}