import React from 'react'
import { FontAwesome } from '@expo/vector-icons'


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