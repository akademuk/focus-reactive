# 🚀 Инструкция по публикации на GitHub

## 📋 Шаги для создания репозитория на GitHub:

### 1. Создание репозитория на GitHub.com

1. Откройте [GitHub.com](https://github.com) и войдите в аккаунт
2. Нажмите кнопку **"New"** или **"Create repository"**
3. Заполните информацию:
   - **Repository name**: `focus-reactive`
   - **Description**: `Modern responsive website showcasing composable content systems`
   - **Visibility**: Public (чтобы работал GitHub Pages)
   - ❌ **НЕ** ставьте галочки на "Initialize with README", "Add .gitignore", "Choose a license"

4. Нажмите **"Create repository"**

### 2. Подключение локального репозитория к GitHub

Выполните эти команды в терминале:

```bash
# Добавляем remote origin (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/focus-reactive.git

# Отправляем код на GitHub
git push -u origin main
```

### 3. Настройка GitHub Pages

1. Перейдите в **Settings** вашего репозитория
2. Прокрутите до раздела **"Pages"** в левом меню
3. В разделе **"Source"** выберите **"GitHub Actions"**
4. Сайт будет доступен по адресу: `https://YOUR_USERNAME.github.io/focus-reactive`

### 4. Обновление ссылок в файлах

После создания репозитория обновите эти файлы:

#### package.json
```json
"repository": {
  "type": "git", 
  "url": "https://github.com/YOUR_USERNAME/focus-reactive.git"
},
"bugs": {
  "url": "https://github.com/YOUR_USERNAME/focus-reactive/issues"
},
"homepage": "https://YOUR_USERNAME.github.io/focus-reactive"
```

#### README.md
Обновите ссылку на демо:
```markdown
🚀 **Live Demo**: [https://YOUR_USERNAME.github.io/focus-reactive](https://YOUR_USERNAME.github.io/focus-reactive)
```

#### DEMO.md  
Обновите ссылку:
```markdown
🚀 **Live Site**: [https://YOUR_USERNAME.github.io/focus-reactive](https://YOUR_USERNAME.github.io/focus-reactive)
```

### 5. Автоматический деплой

GitHub Actions автоматически:
- ✅ Соберет проект при каждом push в main
- ✅ Запустит тесты на Node.js 16, 18, 20
- ✅ Опубликует сайт на GitHub Pages

### 6. Первый push

```bash
# Добавляем изменения с обновленными ссылками
git add .
git commit -m "docs: update repository links"
git push origin main
```

## 🎯 Готово!

Ваш сайт будет автоматически:
- 🌐 Опубликован на GitHub Pages
- 🔄 Обновляться при каждом commit в main
- ✅ Проходить CI/CD проверки
- 📱 Работать на всех устройствах

## 🔗 Полезные ссылки для резюме/портфолио:

- **Код**: `https://github.com/YOUR_USERNAME/focus-reactive`
- **Демо**: `https://YOUR_USERNAME.github.io/focus-reactive`
- **Документация**: Ссылка на README.md

---

**Важно**: Замените `YOUR_USERNAME` на ваш реальный GitHub username во всех ссылках!
