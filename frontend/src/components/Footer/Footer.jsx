import React from 'react';
import { assets } from '../../assets/assets';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="pm-footer">
            <div className="pm-footer-container">
                {/* Top Section */}
                <div className="pm-footer-top">
                    <div className="pm-footer-logo">
                        <img src={assets.logo} alt="Restaurant Logo" />
                        <p>Доставляем вкусные моменты с 2015 года</p>
                    </div>
                    
                    <div className="pm-footer-links">
                        <div className="pm-footer-column">
                            <h3>Меню</h3>
                            <ul>
                                <li><a href="/">Главная</a></li>
                                <li><a href="/menu">Меню</a></li>
                                <li><a href="/about">О нас</a></li>
                                <li><a href="/contacts">Контакты</a></li>
                            </ul>
                        </div>
                        
                        <div className="pm-footer-column">
                            <h3>Контакты</h3>
                            <ul>
                                <li><i className="fas fa-map-marker-alt"></i> г. Кемерово, пр. Ленина, 1</li>
                                <li><i className="fas fa-phone"></i> +7 (123) 456-78-90</li>
                                <li><i className="fas fa-envelope"></i> info@edumarket.ru</li>
                                <li><i className="fas fa-clock"></i> 10:00 - 23:00 без выходных</li>
                            </ul>
                        </div>
                        
                        <div className="pm-footer-column">
                            <h3>Мы в соцсетях</h3>
                            <div className="pm-footer-social">
                                <a href="#"><i className="fab fa-vk"><img src={`http://localhost:3001/images/vk.png`} alt="VK" /></i></a>
                                <a href="#"><i className="fab fa-telegram"><img src={`http://localhost:3001/images/telegram.png`} alt="Telegram" /></i></a>
                                <a href="#"><i className="fab fa-instagram"><img src={`http://localhost:3001/images/instagram.png`} alt="Instagram" /></i></a>
                                <a href="#"><i className="fab fa-whatsapp"><img src={`http://localhost:3001/images/whatsapp.png`} alt="WhatsApp" /></i></a>
                            </div>
                            <div className="pm-footer-apps">
                                <p>Скачайте наше приложение:</p>
                                <div className="pm-app-buttons">
                                    <a href="#"><img src={assets.app_store} alt="App Store" /></a>
                                    <a href="#"><img src={assets.play_store} alt="Google Play" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Section */}
                <div className="pm-footer-bottom">
                    <div className="pm-footer-copyright">
                        <p>© 2023 Food Delivery. Все права защищены.</p>
                    </div>
                    
                    <div className="pm-footer-legal">
                        <a href="/privacy">Политика конфиденциальности</a>
                        <a href="/terms">Условия использования</a>
                        <a href="/faq">FAQ</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;