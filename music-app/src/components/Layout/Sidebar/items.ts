import {
    HomeOutlined,
    SearchOutlined,
    ProfileOutlined,
    PlusSquareFilled,
    HeartOutlined
} from "@ant-design/icons";

export const items = [{
    path: "/",
    itemId: "menu__item",
    icon: HomeOutlined,
    text: 'Главная',
},{
    path: "/search",
    itemId: "menu__item",
    icon: SearchOutlined,
    text: 'Поиск',
},{
    path: "/my-library",
    itemId: "menu__item",
    icon: ProfileOutlined,
    text: 'Моя медиатека',
}
// ,{
//     path: "/create-playlist",
//     itemId: "create-playlist",
//     icon: PlusSquareFilled,
//     text: 'Создать плейлист',
// },{
//     path: "/loved",
//     itemId: "favourite-tracks",
//     icon: HeartOutlined,
//     text: 'Любимые треки',
// }
// ,{
//     path: "/my-playlists",
//     itemId: "my-playlists",
//     icon: null,
//     text: "playlists",
// }
]
