import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { Formik } from 'formik'
import { auth } from 'helpers/firebase'

export default function Register () {
  return (
    <div className='register-page'>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async ({ email, password }, { setSubmitting }) => {
          console.log(auth)
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2))
          //   setSubmitting(false)
          // }, 400)
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form
            className='d-flex flex-column align-items-center mt-5'
            onSubmit={handleSubmit}
            loading={isSubmitting}
          >
            <Form.Field required>
              <label>Email</label>
              <input
                placeholder='Email'
                type='email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <input
                placeholder='Password'
                type='password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Form.Field>
            <Button type='submit'>Register</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
