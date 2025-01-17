import React from 'react'

const RadioLabel = ({ id, label, checked, onChange }) => {
    return (
        <label htmlFor={id} className='leftContainerLabel'>
            <span>{label}</span>
            <input type="radio" name="chemName" id={id} checked={checked} onChange={onChange} />
        </label>
    )
}

export default RadioLabel
