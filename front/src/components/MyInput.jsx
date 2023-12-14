import { Input } from '@chakra-ui/react'

export default function MyInput({ id, type, onChange, label }) {
  return (
    <>
      <label htmlFor={id ?? ''} className="font-medium">
        {label ?? ''}
      </label>
      <Input
        id={id ?? undefined}
        type={type ?? 'text'}
        variant="flushed"
        borderBottomWidth={'revert'}
        borderBottomColor={'third'}
        focusBorderColor="primary"
        onChange={onChange}
        minLength={type === 'password' ? 8 : undefined}
        maxLength={type === 'password' ? 20 : undefined}
      ></Input>
    </>
  )
}
