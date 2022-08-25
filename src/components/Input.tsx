/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { TextInput, Keyboard, View, Platform } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface Props {
  value: any
  placeholder?: string
  onChange: any
  icon?: any
  isPassword?: boolean
  isError?: boolean
  className?: string
}

const Input: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
  icon,
  isPassword,
  isError,
  className,
}) => {
  const [state, setState] = React.useState({
    isFocusOnTextInput: false,
  })

  const { isFocusOnTextInput } = state

  const inputRef: any = React.createRef()
  const focusText = () => {
    inputRef.current.focus()
  }

  return (
    <TouchableWithoutFeedback
      className={`${
        isError
          ? 'bg-[#F156520D] border-[#F15652]'
          : isFocusOnTextInput
          ? 'bg-[#F3FBFF] border-[#0C95DF]'
          : 'bg-[#FAFAFA] border-[#BBBBBB]'
      }
      ${Platform.OS === 'ios' ? 'py-4 px-5' : 'py-1 px-4'}
       border flex flex-row items-center rounded-xl mb-5
       ${className}
       `}
      onPress={() => focusText()}
    >
      {icon ? (
        <View
          className={`${
            Platform.OS === 'ios' ? 'mr-4' : 'mr-2'
          } w-5 items-center`}
        >
          {icon}
        </View>
      ) : null}
      <TextInput
        className="font-sans text-base leading-5 text-black"
        placeholderTextColor="#01293B80"
        placeholder={placeholder || ''}
        value={value}
        onChangeText={text => onChange(text)}
        autoCapitalize={'none'}
        autoCorrect={false}
        autoComplete={'off'}
        onFocus={() => {
          setState({ ...state, isFocusOnTextInput: true })
        }}
        onBlur={() => {
          setState({ ...state, isFocusOnTextInput: false })
          Keyboard.dismiss
        }}
        ref={inputRef}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss
        }}
        secureTextEntry={isPassword ? true : false}
        style={{ width: '100%' }}
      />
    </TouchableWithoutFeedback>
  )
}

export default Input
