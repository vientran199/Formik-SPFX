import * as React from 'react';
import { Formik, Field, FastField, Form } from 'formik';
import * as Yup from 'yup';

const Basic = () => (
  <div>
    <h1>Sign Up</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required(),
        middleInitial: Yup.string(),
        lastName: Yup.string().required(),
        email: Yup.string().email().required(),
      })}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
      render={form => (
        <Form>
          {/** This <FastField> only updates for changes made to
           values.firstName, touched.firstName, errors.firstName */}
          <label htmlFor="firstName">First Name</label>
          <FastField name="firstName" placeholder="Weezy" />

          {/** Updates for all changes because it's from the
           top-level formikProps which get all updates */}
          {form.touched.firstName && form.errors.firstName && (
            <div>{form.errors.firstName}</div>
          )}
    <br/>
    <br/>
          <label htmlFor="middleInitial">Middle Initial</label>
          <FastField name="middleInitial" placeholder="F">
            {({ field, form, meta }) => (
              <div>
                <input {...field} />
                {/**
                 * This updates normally because it's from the same slice of Formik state,
                 * i.e. path to the object matches the name of this <FastField />
                 */}
                {meta.touched ? meta.error : null}

                {/** This won't ever update since it's coming from
                 from another <Field>/<FastField>'s (i.e. firstName's) slice   */}
                {form.touched.firstName && form.errors.firstName
                  ? form.errors.firstName
                  : null}

                {/* This doesn't update either */}
                {form.submitCount}

                {/* Imperative methods still work as expected */}
                <button
                  type="button"
                  onClick={form.setFieldValue('middleInitial', 'J')}
                >
                  J
                </button>
              </div>
            )}
          </FastField>
          <br/>
          <br/>

          {/** Updates for all changes to Formik state
           and all changes by all <Field>s and <FastField>s */}
          <label htmlFor="lastName">LastName</label>
          <Field name="lastName" placeholder="Baby">
            {(field) => (
              <div>
                <input {...field} />
                {/**  Works because this is inside
                 of a <Field/>, which gets all updates */}
                {form.touched.firstName && form.errors.firstName
                  ? form.errors.firstName
                  : null}
              </div>
            )}
          </Field>
          <br/>
          <br/>

          {/** Updates for all changes to Formik state and
           all changes by all <Field>s and <FastField>s */}
          <label htmlFor="email">Email</label>
          <Field name="email" placeholder="jane@acme.com" type="email" />

          <button type="submit">Submit</button>
        </Form>
      )}
    />
  </div>
);

export default Basic