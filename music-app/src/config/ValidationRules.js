import * as yup from "yup";

function getFileExtension(filename) {
    const ext = /^.+\.([^.]+)$/.exec(filename);
    return ext === null ? "" : ext[1];
}

const SUPPORTED_FORMATS_IMAGE = ["jpg", "jpeg", "png"];
const SUPPORTED_FORMATS_AUDIO = ["mp3", "wav"];

export let validationRulesSong = {
    name: yup.string().trim()
        .required('Введите название песни.'),
    artist: yup.string().trim()
        .required('Введите имя исполнителя.'),
    cover: yup
        .mixed()
        .required("Загрузите обложку для песни.")
        .test("fileFormat", "Неподдерживаемый формат файла. Загрузите файл типа image.", value => {
            return SUPPORTED_FORMATS_IMAGE.includes(getFileExtension(value))
        }),
    song: yup
        .mixed()
        .required("Загрузите аудиофайл песни.")
        .test("fileFormat", "Неподдерживаемый формат файла. Загрузите файл типа audio.", value => {
            return SUPPORTED_FORMATS_AUDIO.includes(getFileExtension(value))
        }),
    genre: yup.string().trim()
        .required('Выберите соотвествующий жанр для песни.')
}

