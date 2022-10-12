import *as React from 'react';
import { Formik, Form, Field } from 'formik';

// Synchronous validation function
const validate = value => {
  let errorMessage;
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    errorMessage = 'Invalid email address';
  }
  return errorMessage;
};

// Async validation function
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const validateAsync = value => {
  return sleep(2000).then(() => {
    if ((['admin', 'null', 'god'] as any).includes(value)) {
      return 'Nice try';
    }else{
        return 'fail'
    }
  });
};

// example usage
const MyForm = () => (
  <Formik
    initialValues={{ email: '', username: '' }}
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
  >
    {({ errors, touched }) => (
      <Form>
        <Field validate={validate} name="email" type="email" />
        {errors.email && touched.email ? <div>{errors.email}</div> : null}
        <Field validate={validateAsync} name="username">
        {({
               field, // { name, value, onChange, onBlur }
               form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
               meta,
             }) => (
               <div>
                 <input type="text" placeholder="username" {...field} />
                 {meta.touched && meta.error && (
                   <div className="error">{meta.error}</div>
                 )}
                 {console.log(meta)}{ console.log(form)}
                 {form.isValidating && <div>Loading...</div>}
               </div>
             )}
        </Field>
        {/* {errors.username && touched.username ? (
          <div>{errors.username}</div>
        ) : null} */}
        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
);

export default MyForm