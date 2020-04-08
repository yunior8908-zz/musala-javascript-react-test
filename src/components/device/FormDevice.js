import React, {useEffect} from "react";
import Card from "../common/Card";
import {useForm} from "react-hook-form";

function FormDevice({title, editDevice, cancelForm, saveValues, handleDelete}) {
    useEffect(() => {
        if (editDevice) {
            setValue(Object.keys(editDevice).map(k => ({[k]: editDevice[k]})));
        }
    }, [editDevice]);
    const {handleSubmit, register, errors, setValue} = useForm();

    const onSubmit = (values) => {
        saveValues(values);
    };

    const onDelete = () => {
        handleDelete(editDevice._id)
    };

    return <Card
        col={6}
        title={title}
        footer={<div className="form-row justify-content-end">
            <div className="col-auto">
                <button className="btn btn-secondary btn-sm" onClick={cancelForm}>cancel</button>
            </div>
            {editDevice && <div className="col-auto">
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </div>}
            <div className="col-auto">
                <button className="btn btn-primary btn-sm" onClick={handleSubmit(onSubmit)}>Aceptar</button>
            </div>
        </div>}
        body={<form>
            <input
                ref={register()}
                type="hidden" name="_id"
            />
            <div className="form-group small">
                <label>UID:</label>
                <input
                    ref={register({
                        required: "The field is required.",
                        pattern: {
                            value: /^\d+$/,
                            message: "Invalid format."
                        }
                    })}
                    type="text"
                    className={`form-control form-control-sm is-${errors.uid ? 'invalid' : 'valid'}`}
                    name="uid"
                />
                <div
                    className={`${errors.uid ? 'invalid' : 'valid'}-feedback`}>{errors.uid && errors.uid.message}</div>
            </div>
            <div className="form-group small">
                <label>Vendor:</label>
                <input
                    ref={register()}
                    type="text"
                    className={`form-control form-control-sm is-${errors.vendor ? 'invalid' : 'valid'}`}
                    name="vendor"
                />
                <div
                    className={`${errors.name ? 'invalid' : 'valid'}-feedback`}>{errors.vendor && errors.vendor.message}</div>
            </div>
            <div className="form-group small">
                <label>Status:</label>
                <select
                    ref={register({
                        required: 'The field is required',
                    })}
                    className={`form-control form-control-sm is-${errors.address ? 'invalid' : 'valid'}`}
                    name="status"
                >
                    <option value="online">onine</option>
                    <option value="offline">offline</option>
                </select>
                <div
                    className={`${errors.status ? 'invalid' : 'valid'}-feedback`}>{errors.status && errors.status.message}</div>
            </div>
        </form>}
    />
};

export default FormDevice;