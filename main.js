document.addEventListener("DOMContentLoaded", function(event) {
  const body = document.querySelector('body');
  const currentPage = getCurrentPage();

  createHeader(body, currentPage);
  updateQuestionBlock(currentPage);
  updateAnswerBlock(currentPage);
  addStyles(currentPage);
  addHighlights();
  addMarked();
});

function createHeader(body, isRoot) {
  const taskLinks = Array(8).fill(null).map((el, index) => {
    const pageNumber = index + 1;
    const path = isRoot ? `..` : 'answers';
    return `<a href="${path}/${pageNumber}/index.html">${pageNumber} task</a>`;
  });

  const homePath = isRoot ? `../..` : '.';
  const headerList = `
    <div id="navbar">
      <a href="${homePath}/index.html">Home</a>
      <div class="dropdown">
        <button class="dropbtn" onclick="dropbtn()">Task
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content" id="navbar-dropdown">
          ${taskLinks.join('')}
        </div>
      </div>
    </div>
  `;
  body.innerHTML = `${headerList}${body.innerHTML}`;

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
      const dropdown = document.getElementById("navbar-dropdown");
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  }
}

function updateQuestionBlock(currentPage) {
  const questionEl = document.querySelector('#question');
  if(questionEl) {
    questionEl.innerHTML = `<div id="question-header">Question/Task ${currentPage}</div><div id="question-content">${questionEl.innerHTML}</div>`;
  }
}

function updateAnswerBlock(currentPage) {
  const answerEl = document.querySelector('#answer');
  if(answerEl) {
    answerEl.innerHTML = `<div id="answer-header">Answer ${currentPage}</div><div id="answer-content">${answerEl.innerHTML}</div>`;
  }
}

function getCurrentPage() {
  const match = location.href.match(/.*(answers|questions)\/(.*)\/index.html/);
  return match && match[2];
}

function addStyles(isRoot) {
  const head = document.querySelector('head');
  const path = isRoot ? '../../styles.css' : 'styles.css';
  head.innerHTML = `${head.innerHTML}<link rel="stylesheet" type="text/css" href="${path}">`;
}

function addHighlights() {
  const codeTags = document.querySelectorAll('code');

  codeTags.forEach(codeTag => {
    const isInlineCode = codeTag.classList.contains('inline-code') || '';

    codeTag.textContent = codeTag.innerHTML;
    codeTag.outerHTML = `<pre class="${isInlineCode && 'inline-code'}">${codeTag.outerHTML}</pre>`;
  });

  const head = document.querySelector('head');
  head.innerHTML = `
    ${head.innerHTML}
    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/default.min.css">
  `;

  const script = document.createElement("script");
  script.src = 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js';
  document.head.appendChild(script);
  script.onload = () => {
    hljs.highlightAll();
  }
}


function addMarked() {
  const script = document.createElement("script");
  script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
  document.head.appendChild(script);
  script.onload = () => {
    document.getElementById('content').innerHTML = marked.parse(markdown);
  }
}

function dropbtn() {
  document.getElementById("navbar-dropdown").classList.toggle("show");
}

const markdown = `
## Перед началом работы
1. Установите [WebStorm](https://www.jetbrains.com/ru-ru/webstorm/download/#section=mac):
    1. После установки, выберите вариант с триалом на 30 дней
2. Создайте бесплатный аккаунт на [github](https://github.com/)
3. Войдите в свой аккаунт на [github](https://github.com/)
4. [Установите](https://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-Git) Git:
    1. Windows
        1. Скачайте и установите [Git SCM](https://gitforwindows.org/).
           Во время установки оставьте все значения по умолчанию.
        2. В дальнейшем используйте \`Git Bash\` для работы с командной строкой
    1. Linux
       Откройте терминал и воспользуйтесь менеджером пакетов вашего дистрибутива:
        1. Если у вас дистрибутив, основанный на Debian, например, Ubuntu, используйте apt:
        \`\`\`shell
        sudo apt install git
        \`\`\`
        2. Если у вас Fedora (или другой похожий дистрибутив, такой как RHEL или CentOS), используйте dnf:
        \`\`\`shell
        sudo dnf install git-all
        \`\`\`
    1. Mac
        1. Выполните команду \`git --version\` в терминале.
           Если Git не установлен, вам будет предложено его установить.
5. [Проверка](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys) существующих ключей SSH:
    1. Откройте терминал
    2. Выполните команду \`ls -al ~/.ssh\`:
        1. Если у вас есть ключ и он не используется для другого GitHub аккаунта, вы можете пропустить 6 шаг
        2. Если у вас есть ключ и он используется для другого GitHub аккаунта, вам нужно создать ключ с другим именем в 6 шаге
6. [Создайте SSH ключ](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) на локальном компьютере:
    1. Выполните команду \`ssh-keygen -t ed25519 -C "your_email@example.com"\`
    2. Оставьте название по умолчанию, если у вас нет ключа с таким названием
    3. Введите passphrase (по желанию можно оставить пустым)
    4. Запустите \`ssh-agent\` выполнив команду \`eval "$(ssh-agent -s)"\`
    5. Добавьте приватный ключ в \`ssh-agent\`:
        1. Windows - выполните команду \`ssh-add ~/.ssh/id_ed25519\` в терминале
        1. Linux - выполните команду \`ssh-add ~/.ssh/id_ed25519\` в терминале
        1. Mac - выполните команду \`ssh-add -K ~/.ssh/id_ed25519\` в терминале
7. [Добавьте](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) созданный SSH в ваш GitHub аккаунт:
    1. Выполните команду \`cat ~/.ssh/id_ed25519.pub\`
    2. Скопируйте содержимое файла \`id_ed25519\` с терминала
    3. Перейдите по [ссылке](https://github.com/settings/keys)
    4. Нажмите на кнопку \`New SSH key\`
    5. Введите произвольное название и вставьте скопированное содержимое файла
    5. Нажмите \`Add SSH Key\`
8. Сделайте [форк](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) репозитория [learn-html](https://github.com/2muchcoffeecom/learn-html):
    1. Откройте [learn-html](https://github.com/2muchcoffeecom/learn-html)
    2. Нажмите кнопку \`Fork\` в правом верхнем углу
    3. Если вы все сделаете правильно, в вашем аккаунте появится новый репозиторий
       \`learn-html\` доступный по адресу \`https://github.com/YOUR-USERNAME/learn-html\`
9. [Склонируйте](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository) свой репозиторий на локальный компьютер:
    1. Нажмите зеленую кнопку \`Code\`
    2. Измените выбор с \`HTTPS\` на \`SSH\`
    3. Скопируйте ссылку
    4. Откройте терминал на локальном компьютере
    5. Перейдите в директорию, где должна быть создана папка с проектом
    6. Напечатайте в терминале \`git clone\` и добавьте скопированный url,
       должна получится строка \`git clone git@github.com:YOUR-USERNAME/learn-html.git\`
    7. После нажатия на \`Enter\` будет создана папка \`learn-html\`
7. Откройте папку с проектом в WebStorm

## Опциональные пункты
\`\`\`
Опциональные пункты обязательны к ознакомлению, но детально разбираться на уроках не будут.
\`\`\`

## Сохранение результатов

> После выполнения задачи нужно сделать [коммит](https://github.com/git-guides/git-commit) (git commit -am "descriptive commit message") и [push](https://github.com/git-guides/git-push) (git push origin master) в ваш репозиторий

## Roadmap
1. [Приступая к изучению](https://basicweb.ru/html/html_book.php) (OPTIONAL)
2. [Введение](https://basicweb.ru/html/vvedenie.php) (OPTIONAL)
3. [Создание первой страницы](https://basicweb.ru/html/pervaya_stranica.php) (OPTIONAL)
4. [Базовый HTML](https://basicweb.ru/html/bazoviy_html.php)
5. [Атрибуты](https://basicweb.ru/html/atributy.php)
6. [Ссылки](https://basicweb.ru/html/ssilki.php)
   - Размещение файлов на сайте для скачивания (OPTIONAL)
7. [Форматирование текста](https://basicweb.ru/html/formatirovanie.php)
   - Прочие теги форматирования текста (OPTIONAL)
   - HTML тег <dfn> (OPTIONAL)
   - HTML тег <time> (OPTIONAL)
8. [Списки](https://basicweb.ru/html/spiski.php)
    - Список описаний (OPTIONAL)
    - Список контекстных меню (OPTIONAL)
9. [Стили](https://basicweb.ru/html/stili.php)
10. [Цвета](https://basicweb.ru/html/tsveta.php)
11. [Таблицы](https://basicweb.ru/html/tablici.php)
12. [Комментарии и якоря](https://basicweb.ru/html/coment_yakor.php)
    - Условные комментарии (OPTIONAL)
    - HTML5 Shiv (OPTIONAL)
    - HTML создание закладки (OPTIONAL)
13. [Элементы цитирования и направление текста](https://basicweb.ru/html/citati.php) (OPTIONAL)
14. [Фреймы, аббревиатура и контактная информация](https://basicweb.ru/html/freimi.php) (OPTIONAL)
15. [Компьютерный код](https://basicweb.ru/html/pc_code.php) (OPTIONAL)
16. [Графическое представление значений](https://basicweb.ru/html/graf_predst.php) (OPTIONAL)
17. [Формы](https://basicweb.ru/html/formi.php)
    - Группировка данных формы (OPTIONAL)
18. [Элементы формы, добавленные в HTML 5](https://basicweb.ru/html/formi_html5.php) (OPTIONAL)
19. [Раскрывающийся список и текстовая область](https://basicweb.ru/html/spisok_oblast.php)
20. [HTML тег кнопка](https://basicweb.ru/html/button.php)
21. [Теги разметки страницы](https://basicweb.ru/html/razmetka.php)
`;
