import React, { useEffect } from 'react';

const TelegramLoginWidget = () => {
  useEffect(() => {
    // Вставляем скрипт Telegram Widget в DOM
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'send_data_to_out_youtube_bot'); // Укажите имя вашего бота
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    document.getElementById('telegram-login-widget').appendChild(script);

    // Функция обратного вызова, вызываемая виджетом
    window.onTelegramAuth = (user) => {
      alert(
        `Logged in as ${user.first_name} ${user.last_name} (${user.id}${user.username ? `, @${user.username}` : ''})`
      );
    };
  }, []);

  return <div id="telegram-login-widget"></div>;
};

export default TelegramLoginWidget;
