import React from "react";
import Card from "./Card";
import {useForm} from "react-hook-form";

function FormGateway({editGateway = {}, cancelForm, saveValues}) {
    const {handleSubmit, register, errors} = useForm();

    const onSubmit = (values) => {
        saveValues(values);
    };

    return <Card
        col={6}
        title={"Insert Gateway"}
        footer={<div className="form-row justify-content-end">
            <div className="col-auto">
                <button className="btn btn-secondary btn-sm" onClick={cancelForm}>cancelar</button>
            </div>
            <div className="col-auto">
                <button className="btn btn-primary btn-sm" onClick={handleSubmit(onSubmit)}>Aceptar
                </button>
            </div>
        </div>}
        body={<form>
            <input ref={register()} defaultValue={editGateway._id} type="hidden" name="id"/>
            <div className="form-group small">
                <label>Serial:</label>
                <input ref={register({
                    required: "The field is required.",
                    pattern: {
                        value: /^[\S]+$/,
                        message: "Invalid format."
                    }
                })} defaultValue={editGateway.serial} type="text"
                       className={`form-control form-control-sm is-${errors.serial ? 'invalid' : 'valid'}`}
                       name="serial"/>
                <div
                    className={`${errors.serial ? 'invalid' : 'valid'}-feedback`}>{errors.serial && errors.serial.message}</div>
            </div>
            <div className="form-group small">
                <label>Name:</label>
                <input
                    ref={register()}
                    type="text"
                    defaultValue={editGateway.name}
                    className={`form-control form-control-sm is-${errors.name ? 'invalid' : 'valid'}`}
                    name="name"/>
                <div
                    className={`${errors.name ? 'invalid' : 'valid'}-feedback`}>{errors.name && errors.name.message}</div>
            </div>
            <div className="form-group small">
                <label>Ipv4 Address:</label>
                <input
                    ref={register({
                        required: 'The field is required',
                        pattern: {
                            value: /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/
                        }
                    })}
                    type="text"
                    defaultValue={editGateway.address}
                    className={`form-control form-control-sm is-${errors.address ? 'invalid' : 'valid'}`}
                    name="address"
                />
                <div
                    className={`${errors.address ? 'invalid' : 'valid'}-feedback`}>{errors.address && errors.address.message}</div>
            </div>
        </form>}
    />
};

export default FormGateway;