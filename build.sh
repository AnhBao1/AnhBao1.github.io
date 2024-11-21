#!/usr/bin/env bash
cp -r --remove-destination ./src/. ./
mv ./food.json ./food.js
sed -i '{
    1i const foodData = JSON.parse(`
    $a `)
}' ./food.js

