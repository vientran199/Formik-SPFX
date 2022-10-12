import * as React from 'react';
import { ErrorMessage, Field, Form, Formik, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props as any);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };
  

  const MyCheckbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props as any, type: 'checkbox' });
    return (
      <div>
        <label className="checkbox-input">
          <input type="checkbox" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props as any);
    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', colors:'red',message:'' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // setSubmitting(true) mac dinh se setSubmitting = true
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 6000);
      }}
      validateOnBlur
      validateOnChange={false}
    >
      {formik => (
        <Form>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" type="text" />
        <ErrorMessage name="firstName" /><br></br>

        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" />
        <ErrorMessage name="lastName" /><br></br>

        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" /><br></br>

        <Field name="message" as="textarea" className="form-textarea" /><br></br>
 
        <Field name="colors" as="select" className="my-select">
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        </Field><br></br>
        <MySelect label="Job Type" name="jobType">
             <option value="">Select a job type</option>
             <option value="designer">Designer</option>
             <option value="development">Developer</option>
             <option value="product">Product Manager</option>
             <option value="other">Other</option>
           </MySelect><br></br>
        <button type="submit" disabled={formik.isSubmitting}>Submit</button><br></br>
      </Form>
        // <form onSubmit={formik.handleSubmit}>
        //   <label htmlFor="firstName">First Name</label>
        //   <input
        //     id="firstName"
        //     type="text"
        //     {...formik.getFieldProps('firstName')}
        //   />
        //   {formik.touched.firstName && formik.errors.firstName ? (
        //     <div>{formik.errors.firstName}</div>
        //   ) : null}

        //   <label htmlFor="lastName">Last Name</label>
        //   <input
        //     id="lastName"
        //     type="text"
        //     {...formik.getFieldProps('lastName')}
        //   />
        //   {formik.touched.lastName && formik.errors.lastName ? (
        //     <div>{formik.errors.lastName}</div>
        //   ) : null}

        //   <label htmlFor="email">Email Address</label>
        //   <input id="email" type="email" {...formik.getFieldProps('email')} />
        //   {formik.touched.email && formik.errors.email ? (
        //     <div>{formik.errors.email}</div>
        //   ) : null}

        //   <button type="submit" disabled={formik.isSubmitting}>Submit</button>
        // </form>
      )}
    </Formik>
  );
};

export default SignupForm