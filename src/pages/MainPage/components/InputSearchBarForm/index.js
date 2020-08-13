import React from 'react'
import Input from '@material-ui/core/Input';
import { useForm } from "react-hook-form";



function InputSearchBarForm({onSubmit, searchText}) {
  const { handleSubmit, register, errors } = useForm();

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input  defaultValue={searchText} name="keywords" inputRef={register({})} inputProps={{ 'aria-label': 'description', }} />
      <button type="submit">送出查詢</button>
    </form>
  )
}

InputSearchBarForm.propTypes = {

}

export default InputSearchBarForm

