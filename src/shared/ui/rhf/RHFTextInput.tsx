"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type ControllerProps,
} from "react-hook-form";

import { Input } from "@/shared/ui/input";

type Props<T extends FieldValues> = Omit<
  React.ComponentProps<typeof Input>,
  "name" | "value" | "onChange" | "ref"
> & {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: ControllerProps<T>["defaultValue"];
};

const RHFTextInput = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  ...rest
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => <Input {...rest} {...field} />}
    />
  );
};

export default RHFTextInput;
