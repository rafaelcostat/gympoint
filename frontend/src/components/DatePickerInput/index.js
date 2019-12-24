import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import MaskedInput from 'react-text-mask';

import { useField } from '@rocketseat/unform';

export default function DatePicker({ name, label, onChange, value, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    if (value != 'Invalid Date') {
      // eslint-disable-line
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <ReactDatePicker
        selected={selected}
        onChange={date => {
          setSelected(date);
          if (onChange) onChange(date);
        }}
        name={fieldName}
        ref={ref}
        locale={pt}
        dateFormat="dd/MM/yyyy"
        customInput={
          <MaskedInput
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        }
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}
