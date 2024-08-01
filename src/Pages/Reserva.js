import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Reserva.css';

Modal.setAppElement('#root');

const ReservaForm = () => {
    const { user } = useAuth0();
    const { habitacionId } = useParams();
    const [reservaData, setReservaData] = useState({
        userSub: user.sub,
        FechaCheckIn: '',
        FechaCheckOut: '',
        Estado: '',
        email: user.email
    });

    const [habitacionData, setHabitacionData] = useState({
        Descripcion: '',
        Precio: 0,
        Anticipo: 0,
        EstadoHabitacion: 0
    });
    
    const [pagoData, setPagoData] = useState({
        Monto: '',
        MetodoPago: ''
    });
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [fechasOcupadas, setFechasOcupadas] = useState([]);
    const [lamportTime, setLamportTime] = useState(Date.now());

    useEffect(() => {
        axios.get(`/api/habitaciones/habitacion/${habitacionId}`)
            .then(response => {
                setHabitacionData(response.data);
            })
            .catch(error => {
                console.error('Error fetching room details:', error);
                alert('Error al cargar los detalles de la habitación.');
            });

        axios.get(`/api/reserva/fechas-ocupadas/${habitacionId}`)
            .then(response => {
                const fechas = response.data.map(r => ({
                    start: new Date(r.FechaCheckIn),
                    end: new Date(r.FechaCheckOut)
                }));
                setFechasOcupadas(fechas);
            })
            .catch(error => {
                console.error('Error fetching reserved dates:', error);
                alert('Error al cargar las fechas ocupadas.');
            });
    }, [habitacionId]);

    const handleChangeReserva = (date, name) => {
        setReservaData({ ...reservaData, [name]: date });
    };

    const handleChangePago = (e) => {
        setPagoData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };
    
    const handlePaymentSelection = (value) => {
        setPagoData(prevData => ({
            ...prevData,
            Monto: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            ...reservaData,
            HabitacionID: habitacionId,
            Monto: pagoData.Monto,
            MetodoPago: pagoData.MetodoPago,
            lamportTime
        };

        try {
            const response = await axios.post(`/api/reserva/reserva/${habitacionId}`, postData);
            console.log('Reserva y pago creados:', response.data);
            setLamportTime(response.data.lamportTime);
            alert('Reserva y pago creados exitosamente!');
            setModalIsOpen(false);
        } catch (error) {
            console.error('Error al crear reserva y pago:', error);
            alert('Error al crear la reserva y el pago.');
        }
    };

    const isDateBlocked = (date) => {
        return fechasOcupadas.some(range => date >= range.start && date <= range.end);
    };

    return (
        <div className="form-container">
            <form onSubmit={(e) => { e.preventDefault(); setModalIsOpen(true); }}>
                <h2>Crear Reserva</h2>
                <DatePicker
                    selected={reservaData.FechaCheckIn}
                    onChange={(date) => handleChangeReserva(date, 'FechaCheckIn')}
                    selectsStart
                    startDate={reservaData.FechaCheckIn}
                    endDate={reservaData.FechaCheckOut}
                    minDate={new Date()}
                    filterDate={(date) => !isDateBlocked(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Fecha de Check-In"
                    required
                />
                <DatePicker
                    selected={reservaData.FechaCheckOut}
                    onChange={(date) => handleChangeReserva(date, 'FechaCheckOut')}
                    selectsEnd
                    startDate={reservaData.FechaCheckIn}
                    endDate={reservaData.FechaCheckOut}
                    minDate={reservaData.FechaCheckIn || new Date()}
                    filterDate={(date) => !isDateBlocked(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Fecha de Check-Out"
                    required
                />
                <button type="button" onClick={() => setModalIsOpen(true)}>Pagar Reserva</button>
            </form>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <h2>Detalles de Pago</h2>
                    <div>
                        <label>
                            Total: 
                            <input type="radio" name="paymentOption" checked={pagoData.Monto === habitacionData.Precio.toString()} onChange={() => handlePaymentSelection(habitacionData.Precio.toString())} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Anticipo: 
                            <input type="radio" name="paymentOption" checked={pagoData.Monto === habitacionData.Anticipo.toString()} onChange={() => handlePaymentSelection(habitacionData.Anticipo.toString())} />
                        </label>
                    </div>
                    <input type="text" name="Monto" value={pagoData.Monto} placeholder="Monto" readOnly />
                    <select name="MetodoPago" value={pagoData.MetodoPago} onChange={handleChangePago} required>
                        <option value="">Método de Pago</option>
                        <option value="Tarjeta de Crédito">Tarjeta</option>
                        <option value="Efectivo">Efectivo</option>
                    </select>
                    <button type="submit">Finalizar Reserva y Pago</button>
                </form>
            </Modal>
        </div>
    );
};

export default ReservaForm;
