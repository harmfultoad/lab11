// Получаем контекст для элемента <canvas> с диаграммой
const ctx = document.getElementById('satisfactionChart')?.getContext('2d');
let satisfactionChart; // Глобальная переменная для хранения экземпляра диаграммы

// Функция для расчета удовлетворённости по месяцам
function calculateMonthlySatisfaction(ratings) {
  const monthlySatisfaction = Array(12).fill(0); // Массив для суммы оценок за каждый месяц
  const totalRatingsPerMonth = Array(12).fill(0); // Массив для количества оценок за каждый месяц

  // Перебираем данные оценок
  for (const key in ratings) {
    if (ratings.hasOwnProperty(key)) {
      const { quality, speed, communication, price } = ratings[key]; // Получаем значения оценок
      const parsedQuality = parseInt(quality, 10); // Преобразуем строки в числа
      const parsedSpeed = parseInt(speed, 10);
      const parsedCommunication = parseInt(communication, 10);
      const parsedPrice = parseInt(price, 10);

      // Вычисляем среднюю оценку
      const averageRating = (parsedQuality + parsedSpeed + parsedCommunication + parsedPrice) / 4;

      // Предполагаем, что оценка относится к текущему месяцу
      const currentMonth = new Date().getMonth();
      monthlySatisfaction[currentMonth] += averageRating; // Добавляем к сумме оценок
      totalRatingsPerMonth[currentMonth]++; // Увеличиваем счетчик оценок
    }
  }

  // Вычисляем среднее значение для каждого месяца
  return monthlySatisfaction.map((sum, index) => totalRatingsPerMonth[index] > 0 ? sum / totalRatingsPerMonth[index] : 0);
}

// Функция для инициализации диаграммы
function initializeSatisfactionChart() {
  if (!ctx) return; // Если элемент <canvas> не найден, выходим

  const ratings = JSON.parse(localStorage.getItem('ratings')) || {}; // Получаем данные из localStorage
  const data = calculateMonthlySatisfaction(ratings); // Вычисляем данные для диаграммы

  // Создаем диаграмму
  satisfactionChart = new Chart(ctx, {
    type: 'bar', // Тип диаграммы (столбчатая)
    data: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'], // Месяцы
      datasets: [{
        label: 'Удовлетворенность', // Подпись данных
        data: data, // Данные для диаграммы
        backgroundColor: 'rgba(255, 102, 178, 0.6)', // Цвет столбцов
        borderColor: 'rgba(255, 102, 178, 1)', // Цвет границы
        borderWidth: 1 // Толщина границы
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Ось Y начинается с 0
          max: 5, // Максимальное значение
          grid: {
            color: 'rgba(255, 182, 193, 0.3)' // Цвет сетки
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 182, 193, 0.3)' // Цвет сетки
          }
        }
      }
    }
  });
}

// Инициализируем диаграмму при загрузке страницы
initializeSatisfactionChart();