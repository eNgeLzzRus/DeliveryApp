import React from 'react';
import { assets } from '../../assets/assets';
import './About.css';

const About = () => {
    return (
        <div className="pm-about-container">
            <div className="pm-about-header">
                <h1 className="pm-about-title">О НАШЕМ РЕСТОРАНЕ</h1>
                <div className="pm-underline"></div>
                <p className="pm-about-subtitle">Мы создаем вкусные моменты для вас с 2015 года</p>
            </div>

            <div className="pm-about-content">
                <div className="pm-about-section">
                    <div className="pm-about-text">
                        <h2>Наша история</h2>
                        <p>
                            Наш ресторан начался с маленькой кухни и большой мечты - приносить людям радость через вкусную еду. 
                            За эти годы мы выросли в популярный онлайн-ресторан, но сохранили домашний подход к приготовлению блюд.
                        </p>
                        <p>
                            Каждое блюдо в нашем меню - это результат многолетнего опыта, любви к кулинарии и тщательного 
                            отбора ингредиентов. Мы гордимся тем, что можем делиться этим с вами.
                        </p>
                    </div>
                    <div className="pm-about-image">
                        <img src={`http://localhost:3001/images/about.png`} alt="Наш ресторан" />
                    </div>
                </div>

                <div className="pm-about-values">
                    <h2>Наши принципы</h2>
                    <div className="pm-values-grid">
                        <div className="pm-value-card">
                            <img src={`http://localhost:3001/images/fresh.png`} alt="Свежесть" />
                            <h3>Свежесть</h3>
                            <p>Используем только свежие продукты от проверенных поставщиков</p>
                        </div>
                        <div className="pm-value-card">
                            <img src={`http://localhost:3001/images/quality.png`} alt="Качество" />
                            <h3>Качество</h3>
                            <p>Строгий контроль на всех этапах приготовления</p>
                        </div>
                        <div className="pm-value-card">
                            <img src={`http://localhost:3001/images/delivery.png`} alt="Доставка" />
                            <h3>Быстрая доставка</h3>
                            <p>Доставляем заказы быстро и в идеальном состоянии</p>
                        </div>
                        <div className="pm-value-card">
                            <img src={`http://localhost:3001/images/heart.png`} alt="Забота" />
                            <h3>Забота о клиентах</h3>
                            <p>Ваше удовольствие - наш главный приоритет</p>
                        </div>
                    </div>
                </div>

                <div className="pm-about-team">
                    <h2>Наша команда</h2>
                    <div className="pm-team-grid">
                        <div className="pm-team-member">
                            <img src={`http://localhost:3001/images/chef1.png`} alt="Шеф-повар" />
                            <h3>Иван Петров</h3>
                            <p>Шеф-повар</p>
                            <p>15 лет опыта в европейской кухне</p>
                        </div>
                        <div className="pm-team-member">
                            <img src={`http://localhost:3001/images/chef2.png`} alt="Су-шеф" />
                            <h3>Андрей Сидоров</h3>
                            <p>Су-шеф</p>
                            <p>Специалист по азиатской кухне</p>
                        </div>
                        <div className="pm-team-member">
                            <img src={`http://localhost:3001/images/manager.png`} alt="Менеджер" />
                            <h3>Алексей Смирнов</h3>
                            <p>Менеджер</p>
                            <p>Всегда на связи с нашими клиентами</p>
                        </div>
                    </div>
                </div>

                <div className="pm-about-contacts">
                    <h2>Контакты</h2>
                    <div className="pm-contact-info">
                        <p><strong>Адрес:</strong> г. Кемерово, пр. Ленина, 1</p>
                        <p><strong>Телефон:</strong> +7 (123) 456-78-90</p>
                        <p><strong>Email:</strong> info@edumarket.ru</p>
                        <p><strong>Часы работы:</strong> 10:00 - 23:00 без выходных</p>
                    </div>
                    <div className="pm-contact-map">
                        <iframe 
                            title="Карта расположения"
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aca02bef87bd95ad87df65ea55bbbc69b25cb1889416cf04b3ce1a4f8ea400003&amp;source=constructor"
                            width="100%" 
                            height="400" 
                            frameBorder="0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;