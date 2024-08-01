import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Empleado.css'; // Importa el archivo CSS personalizado

const InsertEmpleadoForm = () => {
    const [formData, setFormData] = useState({
        Nombre: '',
        Apellido: '',
        Email: '',
        Telefono: '',
        Direccion: '',
        CI: '',
        Rol: '',
        FechaRegistro: '',
        FechaContratacion: ''
    });

    const navigate = useNavigate(); // Hook para manejar la navegación

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/empleados/InsertEmp', formData);
            if (response.status === 201) { // Asumiendo que el servidor responde con un código 201 (Created) en éxito
                alert('Empleado creado exitosamente');
                navigate('/habitaciones'); // Redirigir al usuario a la página de empleados
            } else {
                alert('Hubo un problema al crear el empleado');
            }
        } catch (error) {
            console.error('Error al crear empleado:', error);
            alert('Error al crear empleado');
        }
    };

    return (
        <div className="container mt-5">
            <div className="form-container">
                <h2 className="mb-4">Crear Empleado</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" name="Nombre" value={formData.Nombre} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Apellido</label>
                        <input type="text" className="form-control" name="Apellido" value={formData.Apellido} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="Email" value={formData.Email} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" name="Telefono" value={formData.Telefono} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control" name="Direccion" value={formData.Direccion} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">CI</label>
                        <input type="text" className="form-control" name="CI" value={formData.CI} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Rol</label>
                        <input type="text" className="form-control" name="Rol" value={formData.Rol} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Fecha de Registro</label>
                        <input type="datetime-local" className="form-control" name="FechaRegistro" value={formData.FechaRegistro} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Fecha de Contratación</label>
                        <input type="datetime-local" className="form-control" name="FechaContratacion" value={formData.FechaContratacion} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Crear Empleado</button>
                </form>
            </div>
        </div>
    );
};

export default InsertEmpleadoForm;
