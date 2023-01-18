import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet,  Pressable, TouchableOpacity} from 'react-native'

import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'

const SignUpForm = ({navigation}) => {
    const SignUpFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is required'),
        password: Yup.string()
            .required()
            .min(6, 'Your password has to have at least 8 characters'),
    })

    return (
        <View style ={styles.wrapper}>
            <Formik
            initialValues={{email: '', username: '', password: '' }}
            onSubmit={values => {
                console.log(values)
            }}
            validationSchema={SignUpFormSchema}
            validateOnMount={true}
        >
            {({ handleChange, handleBlur, handleSubmit, values, isValid}) => (
            <>
                <View style = {[
                        styles.inputField,
                        {
                            borderColor: 
                                values.email.length < 1 || Validator.validate(values.email) 
                                ? '#ccc' 
                                : 'red'
                        },
                    ]}
                >
                <TextInput
                    placeholderTextColor="#A99E9E"
                    placeholder='Email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    autoFocus={true}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    />
                </View>

            <View 
                    style = {[
                        styles.inputField,
                    {
                        borderColor: 
                            1 > values.username.length || values.username.length >= 2
                                ? '#ccc' 
                                : 'red',
                    },
                ]}
             >
                <TextInput
                    placeholderTextColor="#A99E9E"
                    placeholder='Username'
                    autoCapitalize='none'
                    textContentType='username'
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                />
            </View>
            <View style = {[styles.inputField,
            {
            borderColor: 
                1 > values.password.length || values.password.length >= 6
                    ? '#ccc' 
                    : 'red'
            }
             ]}>
                <TextInput
                    placeholderTextColor="#A99E9E"
                    placeholder='Password'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    textContentType='password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    />
            </View>
            <Pressable 
                titleSize ={20} 
                style={styles.button(isValid)}
                onPress = {handleSubmit}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>

            <View style={styles.loginContainer}>
                <Text>Already have an account?</Text>
                <TouchableOpacity>
                    <Text style={{color:'#0E898B', fontWeight: 'bold'}}> Log In</Text>
                </TouchableOpacity>
            </View>
            </>
            )}
        </Formik>
        </View>
    )
}

export default SignUpForm