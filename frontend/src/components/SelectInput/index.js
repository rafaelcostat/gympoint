import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select/async';

import { useField } from '@rocketseat/unform';

import { SelectInputWrapper } from './styles';

export default function SelectInput({
  name,
  label,
  options,
  onChange,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.props.value;

    return selectValue ? selectValue.id : '';
  }

  const [newValue, setNewValue] = useState();

  useEffect(() => {
    if (defaultValue) {
      setNewValue(options.find(option => option.id === defaultValue));
    }
  }, [defaultValue, options]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <SelectInputWrapper>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        aria-label={fieldName}
        defaultOptions={options}
        defaultValue={newValue}
        value={newValue}
        onChange={value => {
          setNewValue(value);
          onChange(value);
        }}
        ref={ref}
        loadingMessage={() => 'Carregando...'}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        classNamePrefix="react-select"
        {...rest}
      />

      {error && <span>{error}</span>}
    </SelectInputWrapper>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
};

SelectInput.defaultProps = {
  multiple: false,
  onChange: () => {},
};
