import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.jpg'
import menu_2 from './menu_2.jpg'
import menu_3 from './menu_3.jpg'
import menu_4 from './menu_4.jpg'
import menu_5 from './menu_5.jpg'
import menu_6 from './menu_6.jpg'


import burger_1 from './burger_1.jpg'
import burger_2 from './burger_2.jpg'
import burger_3 from './burger_3.webp'
import pizza_1 from './pizza_1.jpg'
import rolli_1 from './rolli_1.webp'
import napitok_1 from './napitok_1.jpg'
import napitok_2 from './napitok_2.jpg'
import napitok_3 from './napitok_3.jpg'
import prochee_1 from './prochee_1.jpg'
import prochee_2 from './prochee_2.jpg'
import shaurma_1 from './shaurma_1.jpg'
import shaurma_2 from './shaurma_2.jpg'
import shaurma_3 from './shaurma_3.webp'
import shaurma_4 from './shaurma_4.webp'


import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
        menu_name: "Шаурма",
        menu_image: menu_1
    },
    {
        menu_name: "Бургеры",
        menu_image: menu_2
    },
    {
        menu_name: "Пицца",
        menu_image: menu_3
    },
    {
        menu_name: "Роллы",
        menu_image: menu_4
    },
    {
        menu_name: "Напитки",
        menu_image: menu_5
    },
    {
        menu_name: "Прочее",
        menu_image: menu_6
    }]

export const food_list = [
    {
        _id: "1",
        name: "Шаурма Классическая",
        image: shaurma_1,
        price: 279,
        description: "Мясо курицы, Салат, Соус, Картошка фри",
        category: "Шаурма"
    },
    {
        _id: "2",
        name: "Шаурма Гавайская",
        image: shaurma_2,
        price: 299,
        description: "Мясо курицы, Салат, Соус, Кусочки ананаса",
        category: "Шаурма"
    },
    {
        _id: "3",
        name: "Бургер с чипсами",
        image: burger_1,
        price: 249,
        description: "Говядина, Булочки, Сыр чеддер, Салат, Помидоры, Лук, Соус, Чипсы",
        category: "Бургеры"
    },
    {
        _id: "4",
        name: "Бургер чёрный",
        image: burger_2,
        price: 379,
        description: "Булочки чёрные, Сыр чеддер, Огурцы, Салат романо, Бекон, Котлета из мраморной говядины, Соус",
        category: "Бургеры"
    },
    {
        _id: "5",
        name: "Пицца Пепперони",
        image: pizza_1,
        price: 469,
        description: "Сыр моцарелла, Сырокопченая колбаса, Перец чили, Помидоры, Орегано, Базалик, Чеснок",
        category: "Пицца"
    },
    {
        _id: "6",
        name: "Копчёный угорь",
        image: rolli_1,
        price: 359,
        description: "Угорь копчёный, Листья нори, Кунжут, Сыр, Рис",
        category: "Роллы"
    },
    {
        _id: "7",
        name: "Милкшейк молочный",
        image: napitok_1,
        price: 249,
        description: "Молоко, Мороженное, Клубника, Ванилин, Сахар",
        category: "Напитки"
    },
    {
        _id: "8",
        name: "Lipton зелёный чай",
        image: napitok_2,
        price: 89,
        description: "Холодный чай зелёный, 0.5л",
        category: "Напитки"
    },
    {
        _id: "9",
        name: "Кола Добрый",
        image: napitok_3,
        price: 129,
        description: "Добрый Кола, 1л",
        category: "Напитки"
    },
    {
        _id: "10",
        name: "Палочки деревянные",
        image: prochee_1,
        price: 29,
        description: "Палочки для суши деревянные, 1 пара",
        category: "Прочее"
    },
    {
        _id: "11",
        name: "Соевый соус",
        image: prochee_2,
        price: 69,
        description: "Соевый соус, 250г",
        category: "Прочее"
    },
    {
        _id: "12",
        name: "Шаурма Арабская",
        image: shaurma_3,
        price: 319,
        description: "Мясо курицы, Салат, Соус, Картошка фри, Омлет, Огурцы, Помидоры",
        category: "Шаурма"
    },
    {
        _id: "13",
        name: "Шаурма Баварская",
        image: shaurma_4,
        price: 269,
        description: "Мясо курицы, Салат, Соус, Огурцы, Помидоры",
        category: "Шаурма"
    },
    {
        _id: "14",
        name: "Бургер Сырный",
        image: burger_3,
        price: 359,
        description: "Морковь, Говядица, Перец, Сыр чеддер, Салат, Авокадо, Помидоры, Лук, Кинза, Перец, Лайм, Чипсы кукурузные, Соус",
        category: "Бургеры"
    },
]
