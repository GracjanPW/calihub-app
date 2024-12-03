import React, { forwardRef, LegacyRef } from "react";
import chroma from "chroma-js";

import Select, { GroupBase, StylesConfig } from "react-select";

type LabelOption = {
  label: string;
  value: string;
  color: string;
};

const colourStyles: StylesConfig<LabelOption, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    border: "solid 1px hsl(var(--input))",
    borderRadius: "calc(var(--radius) - 2px);",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

interface LabelSelectorProps {
  options: LabelOption[];
  defaultValue?: LabelOption[];
  loaded?: boolean;
  disabled?: boolean;
  name?: string;
  onChange: () => void;
  onBlur: () => void;
}

export const LabelSelector = forwardRef(
  (
    {
      options,
      defaultValue,
      loaded,
      onChange,
      onBlur,
      disabled,
      name,
    }: LabelSelectorProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: any
  ) => {
    return (
      <Select
        name={name}
        ref={ref}
        isDisabled={disabled}
        onBlur={onBlur}
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        onChange={onChange}
        isMulti
        menuPlacement="top"
        options={options}
        styles={colourStyles}
        isLoading={!loaded}
      />
    );
  }
);

LabelSelector.displayName = "LabelSelector";
