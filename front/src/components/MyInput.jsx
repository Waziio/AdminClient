/* eslint-disable react/prop-types */
import { Input } from "@chakra-ui/react";

export default function MyInput({ id, type, onChange, placeholder }) {
  return (
    <>
        <Input
          id={id ?? undefined}
          type={type ?? "text"}
          borderColor={"primary"}
          onChange={onChange}
          placeholder={placeholder ?? ""}
          minLength={type === "password" ? 8 : undefined}
          maxLength={type === "password" ? 20 : undefined}
          size={"lg"}
          style={{"borderWidth": "2px"}}
          className="myInput"
        ></Input>
    </>
  );
}
