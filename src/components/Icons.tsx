import React from 'react'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'


export interface IconProps {
    color?: string,
    size?: number
}

const defaultIconProps = {
    color: 'black',
    size: 20
}


export const StarIcon = (props: IconProps) => <FontAwesome name='star' { ...defaultIconProps } { ...props } />

export const PlusIcon = (props: IconProps) => <FontAwesome name='plus' { ...defaultIconProps } { ...props } />

export const MinusIcon = (props: IconProps) => <FontAwesome name='minus' { ...defaultIconProps } { ...props } />

export const ResetIcon = (props: IconProps) => <FontAwesome name='eraser' { ...defaultIconProps } { ...props } />

export const SettingsIcon = (props: IconProps) => <FontAwesome name='gear' { ...defaultIconProps } { ...props } />

export const TimerIcon = (props: IconProps) => <MaterialCommunityIcons name='timer' { ...defaultIconProps } { ...props } />

export const ListIcon = (props: IconProps) => <MaterialCommunityIcons name='menu' { ...defaultIconProps } { ...props } />

