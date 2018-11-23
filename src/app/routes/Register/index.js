import React, { useState } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { Formik } from 'formik'
import { auth } from 'helpers/firebase'
import { registerSchema } from 'utils/schemas'

export default function Register ({ history }) {
  const [message, setMessage] = useState('')

  return (
    <div className='register-page'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={async ({ email, password }, { setSubmitting }) => {
          try {
            await auth.createUserWithEmailAndPassword(email, password)
            history.push('/')
          } catch (error) {
            setMessage(error.message)
          }
          setSubmitting(false)
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          touched
        }) => (
          <Form
            className='d-flex flex-column align-items-center mt-5'
            onSubmit={handleSubmit}
            loading={isSubmitting}
            error={message !== '' || errors.email || errors.password}
          >
            <Form.Field required error={errors.email && touched.email}>
              <label>Email</label>
              <input
                placeholder='Email'
                type='email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <Message error content={errors.email} />
            </Form.Field>
            <Form.Field required error={errors.password && touched.password}>
              <label>Password</label>
              <input
                placeholder='Password'
                type='password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <Message error content={errors.password} />
            </Form.Field>
            <Message error header='Action Forbidden' content={message} />
            <Button
              type='submit'
              disabled={
                (errors.email && touched.email) ||
                  (errors.password && touched.password)
              }
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
