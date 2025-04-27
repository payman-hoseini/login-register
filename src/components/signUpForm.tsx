'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import 'react-phone-input-2/lib/style.css';

export interface CountryOption {
  label: string;
  value: string;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  country: CountryOption | null;
  phone: string;
  password: string;
  agreeRisk: boolean;
  agreeTnC: boolean;
  newsletter: boolean;
}

const SignUpForm: React.FC = () => {
  const countryOptions = React.useMemo(() => countryList().getData(), []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    country: Yup.object<CountryOption>().nullable().required('Country is required'),
    phone: Yup.string().required('Phone Number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    agreeRisk: Yup.boolean().oneOf([true], 'You must accept the risk disclaimer'),
    agreeTnC: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    newsletter: Yup.boolean(),
  });

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    country: null,
    phone: '',
    password: '',
    agreeRisk: false,
    agreeTnC: false,
    newsletter: false,
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log('Form data', values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => {
          // نوع‌دهی مقدار کشور
          const selectedCountry = values.country as CountryOption | null;
          return (
            <Form className="space-y-4">
              <div className='flex gap-5'>
                {/* First Name */}
                <div>
                  <Field
                    placeholder="FirstName"
                    name="firstName"
                    type="text"
                    className="mt-1 w-full p-2 border border-gr rounded-lg focus:outline-none focus:ring-2 focus:ring-border focus:border-primary duration-300"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                {/* Last Name */}
                <div>
                  <Field
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                    className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-border focus:border-primary duration-300"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

              </div>
              {/* Email */}
              <div>
                <Field
                  placeholder="Email"
                  name="email"
                  type="email"
                  className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-border focus:border-primary duration-300"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Country Selector */}
              <div>
                <Select<CountryOption>
                  placeholder="Country"
                  id="country"
                  name="country"
                  options={countryOptions}
                  value={values.country}
                  getOptionLabel={opt => opt.label}
                  getOptionValue={opt => opt.value}
                  onChange={option => setFieldValue('country', option)}
                  className="mt-1"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Phone Number */}
              <div>
                <PhoneInput
                  placeholder="Phone Number"
                  country={selectedCountry?.value.toLowerCase() || 'us'}
                  value={values.phone}
                  onChange={phone => setFieldValue('phone', phone)}
                  inputProps={{
                    name: 'phone',
                  }}
                  containerClass="mt-1"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <Field
                  placeholder="Password"
                  name="password"
                  type="password"
                  className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-border focus:border-primary duration-300"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="agreeRisk"
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="agreeRisk" className="ml-2 text-sm">
                    I have read and agree to the RISK DISCLAIMER
                  </label>
                </div>
                <ErrorMessage
                  name="agreeRisk"
                  component="div"
                  className="text-red-600 text-sm ml-6"
                />

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="agreeTnC"
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="agreeTnC" className="ml-2 text-sm">
                    I have read and agree to the T&Cs
                  </label>
                </div>
                <ErrorMessage
                  name="agreeTnC"
                  component="div"
                  className="text-red-600 text-sm ml-6"
                />

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="newsletter"
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm">
                    I would like to receive news, analysis, marketing, etc.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition duration-200"
              >
                Create Account
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignUpForm;
