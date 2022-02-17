import React, {useCallback, useEffect, useMemo, useState} from "react";
import "./EditPlaylistModal.scss"
import {Button, Form, Input, Modal, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {PlaylistType} from "../../../../config/types";


interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface EditPlaylistModalProps {
    visible: boolean;
    onCreate: (values: PlaylistType) => void;
    onCancel: () => void;
    playlist: PlaylistType
}

const EditPlaylistModal: React.FC<EditPlaylistModalProps> = ({
                                                                 visible,
                                                                 onCreate,
                                                                 onCancel,
                                                                 playlist
                                                             }) => {
    const initialValues: PlaylistType = useMemo(() => {
        return {
            name: playlist.name,
            user: playlist.user,
            cover: playlist.cover,
            songs: playlist.songs
        }
    }, [playlist]);
    //const [initialValues, setInitialValues] = useState({name: playlist.name, cover: playlist.cover})

    const [form] = Form.useForm();

    const onSubmit = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();
                onCreate(values);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });

    }

    useEffect(() => {
        form.setFieldsValue(initialValues)
    }, [form, initialValues])
    return (
        <Modal
            className="edit_playlist__modal"
            visible={visible}
            title="Изменить сведения"
            cancelText="Cancel"
            onCancel={() => {
                form.resetFields()
                onCancel()
            }
            }
            onOk={onSubmit}
            footer={[
                <Button className="edit_playlist__save" onClick={onSubmit}>{"Сохранить".toUpperCase()}</Button>
            ]}
        >
            <Form
                className="edit_playlist__form"
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={initialValues}
            >
                <Form.Item name="cover" className="form__cover">
                    <Upload.Dragger action="/upload.do">
                        <p className="ant-upload-text">
                            &#119135;</p>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item
                    className="form__name"
                    name="name"
                    rules={[{required: true, message: 'Please input the title of collection!'}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

/*const EditPlaylistModal = (props: any) => {
    const playlist = props.playlist;
    const handleOk = props.onOk;
    const dispatch = useDispatch()

    const initialValues: PlaylistType = useMemo(() => {
        return {
            name: playlist.name,
            user: playlist.user,
            cover: playlist.cover,
            songs: playlist.songs
        }
    }, []);

    const onSubmit = useCallback((data: PlaylistType) => {
        if (initialValues !== data) dispatch(updatePlaylistByRequest(playlist._id, data))
        handleOk()
    }, [dispatch])


    // const onSubmit = useCallback((data: PlaylistType) => {
    //     console.log(data)
    // }, [])
    return (
        <Modal
            title="Basic Modal"
            visible={props.visible}
            onOk={props.onOk}
            onCancel={props.onCancel}
            okButtonProps={{color: "red"}}

        >
            <Formik initialValues={initialValues} onSubmit={onSubmit} validateOnBlur>
                {({
                      values,
                      touched,
                      errors,
                      handleSubmit,
                      handleBlur,
                      handleChange
                  }) =>
                    (<form onSubmit={handleSubmit}>
                        <Upload.Dragger name="cover" action="/upload.do" >
                            <p className="ant-upload-drag-icon"></p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                        <Input
                            name="name"
                            id="edit__name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}/>
                        {/!*<Input.TextArea*!/}
                        {/!*    onBlur={handleBlur}*!/}
                        {/!*    onChange={handleChange}/>*!/}
                        <button type="submit" onClick={() => props.onOk}>OK</button>
                    </form>)}
            </Formik>
        </Modal>
    );
};*/

export default EditPlaylistModal;
