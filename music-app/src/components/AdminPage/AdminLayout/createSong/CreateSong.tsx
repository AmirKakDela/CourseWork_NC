import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Formik, Field, Form, FormikHelpers} from "formik";
import {UploadAudioPage} from "../UploadAudioPage/UploadAudioPage";
import "./CreateSong.scss";

interface Values {
    name: string;
    artist: string;
    cover: string;
    song: string;
    genre: string;
    duration: number;
}

export function CreateSong() {
    return (
        <div>
            <UploadAudioPage/>
            <Formik
                initialValues={{
                    name: "",
                    artist: "",
                    cover: "",
                    song: "",
                    genre: "",
                    duration: 0
                }}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form className="form">
                    <div className="form-group">
                        <label htmlFor="name">Название</label>
                        <Field id="name" name="name" placeholder="Название"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="artist">Автор</label>
                        <Field id="artist" name="artist" placeholder="Автор"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Жанр</label>
                        <Field id="genre" name="genre" placeholder="Жанр"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Время</label>
                        <Field id="duration" name="duration" placeholder="Время"/>
                    </div>

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}
