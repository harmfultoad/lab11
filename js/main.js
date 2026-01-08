// Очищаем localStorage при обновлении страницы
localStorage.removeItem('ratings');
// Остальной код...
// Функция для обновления диаграммы
function updateSatisfactionChart() {
  if (!satisfactionChart) return; // Если диаграмма не инициализирована, выходим

  const ratings = JSON.parse(localStorage.getItem('ratings')) || {}; // Получаем данные из localStorage
  const data = calculateMonthlySatisfaction(ratings); // Вычисляем новые данные

  // Обновляем данные диаграммы
  satisfactionChart.data.datasets[0].data = data;
  satisfactionChart.update(); // Обновляем отображение диаграммы
}

// Добавляем обработчики событий для кнопок "Оценить"
document.querySelectorAll('.toggle-rating').forEach(button => {
  button.addEventListener('click', () => {
    const panel = button.nextElementSibling; // Находим панель оценки
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; // Показываем/скрываем панель
  });
});

// Добавляем обработчики событий для кнопок "Отправить оценку"
document.querySelectorAll('.submit-rating').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.executor-card'); // Находим карточку исполнителя
    const quality = card.querySelector('.quality-rating').value; // Значение оценки "Качество"
    const speed = card.querySelector('.speed-rating').value; // Значение оценки "Скорость"
    const communication = card.querySelector('.communication-rating').value; // Значение оценки "Коммуникация"
    const price = card.querySelector('.price-rating').value; // Значение оценки "Цена"

    const executorName = card.querySelector('h3').innerText; // Имя исполнителя
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {}; // Получаем текущие данные
    ratings[executorName] = { quality, speed, communication, price }; // Добавляем новую оценку
    localStorage.setItem('ratings', JSON.stringify(ratings)); // Сохраняем в localStorage

    alert('Оценка отправлена!'); // Сообщение об успехе
    updateSatisfactionChart(); // Обновляем диаграмму
  });
});

// Добавляем обработчики событий для кнопок "Договор"
document.querySelectorAll('.contract-button').forEach(button => {
  button.addEventListener('click', () => {
    const animation = document.querySelector('.handshake-animation'); // Находим блок анимации
    animation.style.display = 'block'; // Показываем анимацию

    setTimeout(() => {
      animation.style.display = 'none'; // Скрываем анимацию через 2 секунды
    }, 2000);
  });
});