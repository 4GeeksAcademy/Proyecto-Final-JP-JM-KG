import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap';

const RegisterModal = ({ show, onHide }) => {
  const { actions } = useContext(Context);
  const [isRegistered, setIsRegistered] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Introduce un correo electrónico válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(8, 'Debe tener 8 caracteres o más')
      .required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Confirma tu contraseña'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Intenta registrar al usuario
        const response = await actions.registerUser(values);
        console.log('Respuesta del servidor:', JSON.stringify(response, null, 2));

        if (response) {
          if (response.success) {
            setIsRegistered(true);
            setSuccessMessage(response.message); // Usamos el mensaje de éxito del servidor
            setErrorMessage('');

            // Cierra el modal después de 2 segundos (2000 ms)
            setTimeout(() => {
              onHide();
            }, 2000);
          } else {
            setErrorMessage(response.error || 'El registro no se pudo completar'); // Muestra el mensaje de error del servidor o uno genérico
            setSuccessMessage('');
          }
        } else {
          setErrorMessage('El registro no se pudo completar'); // Muestra un mensaje de error general
          setSuccessMessage('');
        }
      } catch (error) {
        console.error('Error durante el registro:', error);
        setErrorMessage('Solicitud inválida: Verifica tus datos e inténtalo nuevamente');
        setSuccessMessage('');
      }
    },
  });

  useEffect(() => {
    const loginAfterRegister = async () => {
      if (isRegistered) {
        try {
          await actions.loginUser(formik.values.email, formik.values.password);
          onHide();
        } catch (error) {
          console.error('Error durante el inicio de sesión:', error);
        }
      }
    };

    loginAfterRegister();
  }, [isRegistered, actions, formik.values.email, formik.values.password, onHide]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && (
          <p className="text-success register">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-danger">{errorMessage}</p>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control form-control-lg ${
                formik.errors.email && formik.touched.email ? 'is-invalid' : ''
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-label" htmlFor="email">
              Correo electrónico
            </label>
            {formik.errors.email && formik.touched.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control form-control-lg ${
                formik.errors.password && formik.touched.password ? 'is-invalid' : ''
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            {formik.errors.password && formik.touched.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-control form-control-lg ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? 'is-invalid'
                  : ''
              }`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-label" htmlFor="confirmPassword">
              Confirmar contraseña
            </label>
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
            )}
          </div>
          <div className="pt-1 mb-4">
            <button className="btn btn-secondary btn-lg btn-block" type="submit">
              Registrarse
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
