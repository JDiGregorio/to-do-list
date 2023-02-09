import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect } from "react"

const App = () => {
    const [homeworks, setHomeworks] = useState([])
    const [description, setDescription] = useState("")

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await fetch("api/homework/GetHomeworks")

        if (response.ok) {
            const data = await response.json()
            setHomeworks(data)
            console.log(data)
        } else {
            console.log("Status code: " + response.status)
        }
    }

    const formatDate = (stringDate) => {
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        let date = new Date(stringDate).toLocaleDateString("es-ES", options)
        let hour = new Date(stringDate).toLocaleTimeString()
        return date + " | " + hour;
    }

    const saveHomework = async (event) => {
        event.preventDefault()

        const response = await fetch("api/homework/StoreHomework", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                description: description
            })
        })

        if (response.ok) {
            setDescription("")
            await getData()
        }
    }

    const deleteHomework = async (id) => {
        const response = await fetch("api/homework/CloseHomework/" + id, {
            method: "DELETE"
        })

        if (response.ok) {
            await getData()
        }
    }

    return (
        <div className="container bg-dark p-4 vh-100">
            <h2 className="text-white">
                Lista de tareas
            </h2>

            <div className="row">
                <div className="col-sm-12">
                    <form onSubmit={saveHomework}>
                        <div className="input-group">
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Ingrese la descripci&oacute;n" />

                            <button type="submit" className="btn btn-success">
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {homeworks.map(homework => (
                            <div key={homework.idHomework} className="list-group-item list-group-item-action">
                                <h5 className="text-primary">
                                    {homework.description}
                                </h5>

                                <div className="d-flex justify-content-between">
                                    <small className="text-muted">
                                        {formatDate(homework.createdAt)}
                                    </small>

                                    <button onClick={() => deleteHomework(homework.idHomework)} className="btn btn-sm btn-outline-danger">
                                        Cerrar
                                    </button>
                                </div>
                            </div>  
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App