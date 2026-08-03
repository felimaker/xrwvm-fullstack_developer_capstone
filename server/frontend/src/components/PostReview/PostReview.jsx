import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostReview = () => {
    const [cars, setCars] = useState([
    { CarMake: "BMW", CarModel: "X5" },
    { CarMake: "Mercedes-Benz", CarModel: "Clase C" }
]);
    const { id } = useParams();

    useEffect(() => {
        const get_cars = async () => {
            const res = await fetch('/djangoapp/get_cars');
            const retobj = await res.json();
            setCars(retobj.CarModels || []);
        };
        get_cars();
    }, []);

    const submitReview = async (e) => {
        e.preventDefault();
        // Simulación de envío exitoso para el frontend
        window.location.href = `/dealer/${id}`; 
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Escribir una Reseña</h2>
            <form onSubmit={submitReview}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nombre: </label><br/>
                    <input type="text" required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Reseña: </label><br/>
                    <textarea required rows="4" cols="50"></textarea>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Fecha de Compra: </label><br/>
                    <input type="date" required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Auto (Marca y Modelo): </label><br/>
                    <select required>
                        <option value="">Selecciona un auto...</option>
                        {cars.map((car, idx) => (
                            <option key={idx} value={`${car.CarMake}-${car.CarModel}`}>{car.CarMake} {car.CarModel}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Año del Auto: </label><br/>
                    <input type="number" required />
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}

export default PostReview;