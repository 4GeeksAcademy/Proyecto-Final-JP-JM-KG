import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RegisterModal from './register';

const Login = ({ showModal, handleCloseModal, handleSubmit, successMessage, loginError }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false); // Estado para mostrar el mensaje de error

  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Introduce un correo electrónico válido')
      .required('Campo obligatorio'),
    password: Yup.string()
      .min(8, 'Debe tener 8 caracteres o más')
      .required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        // Intenta realizar la solicitud de inicio de sesión
        await handleSubmit(values.email, values.password);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Si la solicitud falla con un código 401, muestra el mensaje de error del servidor
          loginError(error.response.data.error);
        } else {
          // Si ocurre otro tipo de error, muestra un mensaje genérico
          loginError('Error durante el inicio de sesión: Verifica tus credenciales e inténtalo nuevamente.');
        }

        // Muestra el mensaje de error
        setShowErrorMessage(true);
      }
    },
  });

  // Función para cerrar el mensaje de error
  const closeErrorMessage = () => {
    setShowErrorMessage(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control form-control-lg"
                value={formik.values.email}
                onChange={formik.handleChange}
                aria-describedby="emailHelp"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
              <label className="form-label" htmlFor="email">
                Correo electrónico
              </label>
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control form-control-lg"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
              <label className="form-label" htmlFor="password">
                Contraseña
              </label>
            </div>
            <div className="pt-1 mb-4">
              <button
                className="btn btn-secondary btn-lg"
                style={{ marginRight: '30px' }}
                type="submit"
              >
                Ingresar
              </button>
              <button
                className="btn btn-link"
                onClick={handleShowRegisterModal}
              >
                Crear cuenta
              </button>
            </div>
            {successMessage && <p>{successMessage}</p>}
            {showErrorMessage && (
              <div className="alert alert-danger" role="alert">
                Email o contraseña incorrectos. Por favor, verifica tus credenciales.
                <button type="button" className="close" onClick={closeErrorMessage}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
          </form>
        </Modal.Body>
      </Modal>
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      />
    </>
  );
};

export default Login;
