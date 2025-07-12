#!/bin/bash

# 🚀 Focus Reactive - Quick Deploy Script
# Скопируйте и выполните эти команды для публикации проекта

echo "🔗 Добавляем GitHub репозиторий..."
echo "⚠️  ЗАМЕНИТЕ 'YOUR_USERNAME' на ваш GitHub username!"
echo ""

echo "git remote add origin https://github.com/YOUR_USERNAME/focus-reactive.git"
echo "git push -u origin main"
echo ""

echo "📋 После выполнения команд:"
echo "1. Перейдите в Settings > Pages в вашем GitHub репозитории"
echo "2. Выберите Source: 'GitHub Actions'"
echo "3. Ваш сайт будет доступен по: https://YOUR_USERNAME.github.io/focus-reactive"
echo ""

echo "✅ Готово! Ваш сайт будет автоматически деплоиться при каждом commit."
