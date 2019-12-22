import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@rocketseat/unform';
import CurrencyInputWrapper from 'react-currency-input';
import PropTypes from 'prop-types';

export default function CurrencyInput({ name, label, onChange, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [amount, setAmount] = useState(defaultValue);

  useEffect(() => {
    setAmount(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <CurrencyInputWrapper
        id={name}
        prefix="R$"
        decimalSeparator=","
        thousandSeparator="."
        precision="2"
        ref={ref}
        value={amount}
        onChange={onChange}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

CurrencyInput.defaultProps = {
  label: null,
  onChange: null,
};
