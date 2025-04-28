'use client'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Eye, EyeOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export interface LoginFormValues {
  loginMethod: 'email' | 'phone'
  email: string
  phone: string
  password: string
}

const phoneRegex = /^[0-9]+$/

const validationSchema = Yup.object().shape({
  loginMethod: Yup.string()
    .oneOf(['email', 'phone'])
    .required(),
  email: Yup.string()
    .email('Invalid email')
    .when('loginMethod', {
      is: 'email',
      then: (schema: Yup.StringSchema) => schema.required('Email is required'),
      otherwise: (schema: Yup.StringSchema) => schema.notRequired(),
    }),
  phone: Yup.string()
    .matches(phoneRegex, 'Phone number must be numeric')
    .when('loginMethod', {
      is: 'phone',
      then: (schema: Yup.StringSchema) => schema.required('Phone number is required'),
      otherwise: (schema: Yup.StringSchema) => schema.notRequired(),
    }),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

const LoginForm: React.FC = () => {
  const [method, setMethod] = useState<'email' | 'phone'>('email')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  
  const initialValues: LoginFormValues = {
    loginMethod: method,
    email: '',
    phone: '',
    password: '',
  }

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, resetForm }: FormikHelpers<LoginFormValues>
  ) => {
    const payload =
      values.loginMethod === 'email'
        ? { email: values.email, password: values.password }
        : { phone: values.phone, password: values.password }

    try {
      const res = await fetch('/api/signIn/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, method: values.loginMethod }),
      })
      if (!res.ok) {
        const errorData = await res.json()
        toast.error(errorData.error || 'Login error!')
        return
      }
      toast.success('Login successful!')
      resetForm()
      router.push('/')
    } catch (error: any) {
      toast.error(error.message || 'Login error!')
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <div className="max-w-md mx-auto p-6">
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      <div className="flex justify-center mb-4">
        {(['email', 'phone'] as const).map((m) => (
          <button
            key={m}
            type="button"
            className={`px-4 py-2 rounded-t-lg ${method === m ? 'bg-btn text-white' : 'bg-gray-200'}`}
            onClick={() => setMethod(m)}
          >
            {m === 'email' ? 'Email' : 'Phone'}
          </button>
        ))}
      </div>
      <Formik
        enableReinitialize
        initialValues={{ ...initialValues, loginMethod: method }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4 ">
            <Field name="loginMethod" type="hidden" value={method} />
            <AnimatePresence mode="wait">
              {method === 'email' && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full text-sm p-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-border focus:border-primary duration-300"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-xs mt-1" />
                </motion.div>
              )}

              {method === 'phone' && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Field name="phone">
                    {({ field }: any) => (
                      <PhoneInput
                        {...field}
                        country="us"
                        value={field.value}
                        onChange={(val) => setFieldValue('phone', val)}
                        inputClass="w-full p-2 border border-gray focus:outline-none focus:ring-2 focus:ring-border focus:border-primary duration-300"
                        inputStyle={{ 
                            width: '100%',
                            border: '1px solid #8C8C8C',
                            borderRadius: '0.5rem',      
                            outline: 'none',
                        }}
                        containerStyle={{
                            marginTop: '0.25rem',
                            borderRadius: '0.5rem',      
                        }}
                        
                      />
                    )}
                  </Field>
                  <ErrorMessage name="phone" component="div" className="text-red-600 text-xs mt-1" />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <div className="relative">
                <Field name="password">
                  {({ field }: any) => (
                    <input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="w-full text-sm p-2 pr-10 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-border focus:border-primary duration-300"
                    />
                  )}
                </Field>
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                >
                  {showPassword ?  <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-600 text-xs mt-1" />
            </div>
            <div>
                <Link href="/" className='text-xs text-primary hover:text-border'>Forget Password?</Link>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-btn text-white rounded-2xl hover:opacity-50 transition duration-200"
            >
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm;
