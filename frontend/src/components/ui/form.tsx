import React, { ComponentProps } from 'react'
import { Control, Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { Label } from '@/components/ui/label'

type FormContextValue = {
  control: Control<any>
}
const FormContext = React.createContext<FormContextValue>({} as FormContextValue)

type FormProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>
} & ComponentProps<'form'>

const Form = <TFieldValues extends FieldValues = FieldValues>({
  control,
  children,
  ...props
}: FormProps<TFieldValues>) => {
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // event.stopPropagation()
    if (props.onSubmit) {
      props.onSubmit(event)
    }
  }
  return (
    <FormContext.Provider value={{ control }}>
      <form method="POST" {...props} onSubmit={handleOnSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

function useFormControl<TFieldValues extends FieldValues = FieldValues>():
  | Control<TFieldValues>
  | undefined {
  const context = React.useContext(FormContext)
  return context.control as Control<TFieldValues>
}

type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label?: React.ReactNode
} & ControllerProps<TFieldValues, TName>

const FormControl = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormControlProps<TFieldValues, TName>,
) => {
  const formControl = useFormControl<TFieldValues>()
  return (
    <Controller
      {...props}
      control={formControl ?? props.control}
      name={props.name}
      render={({ field, fieldState, formState }) => {
        return (
          <div className={'w-full'}>
            {props.label && (
              <label
                htmlFor={field.name}
                className="block text-sm font-sans  text-black dark:text-white"
              >
                {props.label}
              </label>
            )}
            <div className="mt-1 mb-1 ">
              {props.render({
                field,
                fieldState,
                formState,
              })}
            </div>
            {fieldState.error && (
              <Label className={'text-red-400 text-xs  pt-8'}>{fieldState.error?.message}</Label>
            )}
          </div>
        )
      }}
    />
  )
}

Form.Control = FormControl

export { Form }
