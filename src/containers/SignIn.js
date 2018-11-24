import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { Formik } from 'formik'
import { auth } from 'helpers/firebase'
import { registerSchema } from 'utils/schemas'
import context from '../context'

export default function Register ({ history }) {
  const [error, setError] = useState('')
  const { state } = useContext(context)

  useEffect(() => {
    const { user } = state
    if (user) {
      history.push('/app')
    }
  })

  return (
    <div className='register-page'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={async ({ email, password }, { setSubmitting }) => {
          try {
            await auth.signInWithEmailAndPassword(email, password)
            history.push('/app')
          } catch (error) {
            setError(error)
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
            error={
              !!(error !== '' || errors.email || errors.password)
            }
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
            {error !== '' &&
              <Message error header={error.code} content={error.message} />}
            <Button
              type='submit'
              primary
              disabled={
                (errors.email && touched.email) ||
                  (errors.password && touched.password)
              }
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
